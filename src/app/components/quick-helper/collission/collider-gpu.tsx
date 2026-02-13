import * as THREE from 'three'
import { useEffect, useMemo, useRef, type RefObject } from 'react'
import { useCanvasContext } from '../../../../threejs/canvas-utils/canvas-provider'
import { useStudioStore } from '@/app/studio/store/studio-store'

const ColliderGpu = () => {
    const { scene, camera, renderer } = useCanvasContext()
    const { selectedMesh } = useStudioStore()

    const raycaster = useMemo(() => new THREE.Raycaster(), [])
    const activeBoxHelper = useRef<any[] | null>(null)

    useEffect(() => {
        if (!scene || !camera || !renderer || !selectedMesh) return

        activeBoxHelper.current = []
        let rafId: number

        const animate = () => {
            createColliderBox()
            rafId = requestAnimationFrame(animate)
        }

        rafId = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(rafId)

            if (activeBoxHelper.current) {
                removeLineRefs(activeBoxHelper)
            }
        }
    }, [scene, camera, renderer, selectedMesh])


    const createColliderBox = () => {
        if (!scene || !selectedMesh) return

        // 🔥 Remove previous helper
        if (activeBoxHelper.current) {
            removeLineRefs(activeBoxHelper)
            activeBoxHelper.current = []
        }

        const origin = selectedMesh.position.clone()
        const directions = [
            new THREE.Vector3(1, 0, 0),
            new THREE.Vector3(-1, 0, 0),
            new THREE.Vector3(0, 1, 0),
            new THREE.Vector3(0, -1, 0),
            new THREE.Vector3(0, 0, 1),
            new THREE.Vector3(0, 0, -1),
        ]

        const minDistance = 0.1

        outer:
        for (const dir of directions) {
            raycaster.set(origin, dir.normalize())
            const hits = raycaster.intersectObjects(scene.children, true)

            for (const hit of hits) {
                if (
                    hit.object.userData.isGizmo ||
                    hit.distance < minDistance
                ) continue


                const minMax = getGeometryMinMaxPointsWorld(hit.object as THREE.Mesh)
                const line = boundingLineObj(minMax)
                scene.add(line)
                activeBoxHelper.current?.push(line)
                // ✅ Apply / update shader
                applyGradientBoxShader(
                    selectedMesh as THREE.Mesh,
                    minMax
                )

                const selectedMinMax = getGeometryMinMaxPointsWorld(selectedMesh as THREE.Mesh)
                const line2 = boundingLineObj(minMax)
                scene.add(line2)
                activeBoxHelper.current?.push(line2)
                applyGradientBoxShader(
                    hit.object as THREE.Mesh,
                    selectedMinMax
                )

                break outer
            }
        }
    }

    return null
}

export default ColliderGpu


function applyGradientBoxShader(
    mesh: THREE.Mesh | null,
    box: { min: THREE.Vector3, max: THREE.Vector3 }
) {
    if (!mesh) return

    const material = mesh.material as THREE.MeshStandardMaterial & {
        userData: any
    }

    // 🔒 Patch once
    if (!material.userData._patched) {
        material.userData._patched = true
        material.onBeforeCompile = (shader) => {
            shader.uniforms.boxMin = { value: box.min.clone() }
            shader.uniforms.boxMax = { value: box.max.clone() }

            material.userData._shader = shader

            // ---------- VERTEX ----------
            shader.vertexShader = `
                varying vec3 vWorldPos;
            ` + shader.vertexShader

            shader.vertexShader = shader.vertexShader.replace(
                '#include <begin_vertex>',
                `
                #include <begin_vertex>
                vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
                `
            )

            // ---------- FRAGMENT ----------
            shader.fragmentShader = `
                varying vec3 vWorldPos;
                uniform vec3 boxMin;
                uniform vec3 boxMax;
            ` + shader.fragmentShader

            shader.fragmentShader = shader.fragmentShader.replace(
                '#include <dithering_fragment>',
                `
                float t = clamp(
                    (vWorldPos.y - boxMin.y) / (boxMax.y - boxMin.y),
                    0.0,
                    1.0
                );

                vec3 c1 = vec3(1.0, 0.0, 0.0);
                vec3 c2 = vec3(1.0, 0.5, 0.0);
                vec3 c3 = vec3(1.0, 1.0, 0.0);
                vec3 c4 = vec3(0.0, 1.0, 0.0);
                vec3 c5 = vec3(0.0, 0.0, 1.0);

                vec3 gradientColor;
                if (t < 0.25) {
                    gradientColor = mix(c5, c4, t / 0.25);
                } else if (t < 0.5) {
                    gradientColor = mix(c4, c3, (t - 0.25) / 0.25);
                } else if (t < 0.75) {
                    gradientColor = mix(c3, c2, (t - 0.5) / 0.25);
                } else {
                    gradientColor = mix(c2, c1, (t - 0.75) / 0.25);
                }

                if (
                    vWorldPos.x < boxMin.x || vWorldPos.x > boxMax.x ||
                    vWorldPos.y < boxMin.y || vWorldPos.y > boxMax.y ||
                    vWorldPos.z < boxMin.z || vWorldPos.z > boxMax.z
                ) {
                    return;
                } else {
                    gl_FragColor = vec4(gradientColor, 1.0);
                }

                #include <dithering_fragment>
                `
            )
        }

        material.needsUpdate = true
    }

    // 🔁 Update uniforms every intersection
    const shader = material.userData._shader
    if (shader) {
        shader.uniforms.boxMin.value.copy(box.min)
        shader.uniforms.boxMax.value.copy(box.max)
    }
}

const geometryMinMaxCache = new Map<string, { min: THREE.Vector3; max: THREE.Vector3 }>()

export function getGeometryMinMaxPointsWorld(mesh: THREE.Mesh) {
    const geometry = mesh.geometry as THREE.BufferGeometry
    const position = geometry.attributes.position

    if (!position) {
        throw new Error('Geometry has no position attribute.')
    }

    // Cache LOCAL bounds per geometry (NOT mesh)
    const geoUUID = geometry.uuid

    if (!geometryMinMaxCache.has(geoUUID)) {
        const min = new THREE.Vector3(Infinity, Infinity, Infinity)
        const max = new THREE.Vector3(-Infinity, -Infinity, -Infinity)
        const vertex = new THREE.Vector3()

        for (let i = 0; i < position.count; i++) {
            vertex.set(
                position.getX(i),
                position.getY(i),
                position.getZ(i)
            )

            min.min(vertex)
            max.max(vertex)
        }

        geometryMinMaxCache.set(geoUUID, { min, max })
    }

    // Get cached LOCAL bounds
    const cached = geometryMinMaxCache.get(geoUUID)!

    // Update world matrix
    mesh.updateWorldMatrix(true, false)

    // IMPORTANT: clone before applying matrix
    const worldMin = cached.min.clone().applyMatrix4(mesh.matrixWorld)
    const worldMax = cached.max.clone().applyMatrix4(mesh.matrixWorld)

    return { min: worldMin, max: worldMax }
}


export function boundingLineObj(minMax: { min: THREE.Vector3, max: THREE.Vector3 }) {
    const points = [
        minMax.min,
        minMax.max,
    ]

    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({ color: 'orange' })
    const line = new THREE.Line(geometry, material)
    return line
}


export function removeLineRefs(
    activeBoxHelper: RefObject<THREE.Object3D[] | null>
) {
    if (!activeBoxHelper.current) return

    activeBoxHelper.current.forEach((obj) => {
        if (!obj) return

        // Remove from parent
        if (obj.parent) {
            obj.parent.remove(obj)
        }

        // Dispose geometry
        const mesh = obj as THREE.Mesh
        if (mesh.geometry) {
            mesh.geometry.dispose()
        }

        // Dispose material(s)
        if ((mesh as any).material) {
            const material = (mesh as any).material

            if (Array.isArray(material)) {
                material.forEach((mat) => mat.dispose())
            } else {
                material.dispose()
            }
        }
    })

    activeBoxHelper.current = null
}