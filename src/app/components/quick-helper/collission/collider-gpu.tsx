import * as THREE from 'three'
import  { useEffect, useMemo, useRef } from 'react'
import { useCanvasContext } from '../../../../threejs/canvas-utils/canvas-provider'
import { useStudioStore } from '@/app/studio/store/studio-store'

const ColliderGpu = () => {
    const { scene, camera, renderer } = useCanvasContext()
    const { selectedMesh } = useStudioStore()

    const raycaster = useMemo(() => new THREE.Raycaster(), [])
    const activeBoxHelper = useRef<THREE.Box3Helper | null>(null)

    useEffect(() => {
        if (!scene || !camera || !renderer || !selectedMesh) return

        let rafId: number

        const animate = () => {
            createColliderBox()
            rafId = requestAnimationFrame(animate)
        }

        rafId = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(rafId)

            if (activeBoxHelper.current) {
                activeBoxHelper.current.parent?.remove(activeBoxHelper.current)
                activeBoxHelper.current.geometry.dispose()
                    ; (activeBoxHelper.current.material as THREE.Material).dispose()
                activeBoxHelper.current = null
            }
        }
    }, [scene, camera, renderer, selectedMesh])


    const createColliderBox = () => {
        if (!scene || !selectedMesh) return

        // 🔥 Remove previous helper
        if (activeBoxHelper.current) {
            activeBoxHelper.current.parent?.remove(activeBoxHelper.current)
            activeBoxHelper.current.geometry.dispose()
                ; (activeBoxHelper.current.material as THREE.Material).dispose()
            activeBoxHelper.current = null
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
                    hit.object === selectedMesh ||
                    hit.object.userData.isGizmo ||
                    hit.distance < minDistance
                ) continue
                

                const box = new THREE.Box3().setFromObject(hit.object)

                // ✅ Create helper (only one)
                const helper = new THREE.Box3Helper(box, 0xff00ff)
                scene.add(helper)
                activeBoxHelper.current = helper

                // ✅ Apply / update shader
                applyGradientBoxShader(
                    selectedMesh as THREE.Mesh,
                    box
                )

                break outer
            }
        }
    }

    return null
}

export default ColliderGpu

// --------------------------------------------------
// SHADER PATCH (PATCH ONCE, UPDATE UNIFORMS)
// --------------------------------------------------

function applyGradientBoxShader(
    mesh: THREE.Mesh | null,
    box: THREE.Box3
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


