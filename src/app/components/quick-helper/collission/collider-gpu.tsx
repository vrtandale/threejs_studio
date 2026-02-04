import * as THREE from 'three'
import { useCanvasContext } from '../../../../threejs/canvas-utils/canvas-provider';
import React from 'react';
import { useClippingStore } from '../clipping/clipping-store';
import { useStudioStore } from '@/app/studio/store/studio-store';

const ColliderGpu = () => {
    const { scene, renderer, camera } = useCanvasContext()
    const { selectedMesh } = useStudioStore()
    const rayCaster = new THREE.Raycaster()

    React.useEffect(() => {
        setInterval(() => {
            createColliderBox()
        }, 100)
    }, [selectedMesh])

    const getFaceNormal = (intersect: THREE.Intersection): THREE.Vector3 => {
        const mesh = intersect.object as THREE.Mesh
        const geometry = mesh.geometry

        if (!geometry) return new THREE.Vector3(0, 0, 1)

        // Check if geometry has normals computed
        if (!geometry.getAttribute('normal')) {
            geometry.computeVertexNormals()
        }

        const faceIndex = intersect.faceIndex
        if (faceIndex === undefined) return new THREE.Vector3(0, 0, 1)

        const normals = geometry.getAttribute('normal') as THREE.BufferAttribute
        const indices = geometry.getIndex()

        // Get the indices of the face vertices
        let a, b, c
        if (indices) {
            a = indices.getX(faceIndex * 3)
            b = indices.getX(faceIndex * 3 + 1)
            c = indices.getX(faceIndex * 3 + 2)
        } else {
            a = faceIndex * 3
            b = faceIndex * 3 + 1
            c = faceIndex * 3 + 2
        }

        // Get normal vectors for all three vertices
        const na = new THREE.Vector3(
            normals.getX(a),
            normals.getY(a),
            normals.getZ(a)
        )
        const nb = new THREE.Vector3(
            normals.getX(b),
            normals.getY(b),
            normals.getZ(b)
        )
        const nc = new THREE.Vector3(
            normals.getX(c),
            normals.getY(c),
            normals.getZ(c)
        )

        // Average the three vertex normals
        const faceNormal = new THREE.Vector3()
        faceNormal.add(na).add(nb).add(nc).divideScalar(3)

        // Transform to world space
        faceNormal.transformDirection(mesh.matrixWorld)

        return faceNormal.normalize()
    }

    const createColliderBox = () => {
        if (!scene || !camera || !renderer) return
        if (!selectedMesh) return
        const originPoint = selectedMesh.position.clone()
        const directions = [
            new THREE.Vector3(1, 0, 0),
            new THREE.Vector3(-1, 0, 0),
            new THREE.Vector3(0, 1, 0),
            new THREE.Vector3(0, -1, 0),
            new THREE.Vector3(0, 0, 1),
            new THREE.Vector3(0, 0, -1),
        ]
        const rayLength = 1
        directions.forEach(direction => {
            rayCaster.set(originPoint, direction)
            const intersects = rayCaster.intersectObjects(scene.children, true)

            intersects.forEach(intersect => {
                if (intersect.distance < rayLength && intersect.object !== selectedMesh && !intersect.object.userData.isGizmo) {
                    const normal = getFaceNormal(intersect)
                    console.log('Intersected object:', intersect.object.geometry)
                    console.log('Face normal:', normal)
                    const material = intersect.object.material;
                    if (!material.userData._patched) {
                        material.onBeforeCompile = (shader: any) => {

                            shader.uniforms.planeNormal = { value: normal };
                            shader.uniforms.planePoint = { value: originPoint };

                            // Inject into vertex shader
                            shader.vertexShader = shader.vertexShader.replace(
                                "void main() {",
                                `
                        varying vec3 vWorldPos;
                        void main() {
                            vec4 worldPos = modelMatrix * vec4(position, 1.0);
                            vWorldPos = worldPos.xyz;
                        `
                            );

                            // Inject into fragment shader
                            shader.fragmentShader = shader.fragmentShader.replace(
                                "void main() {",
                                `
                        varying vec3 vWorldPos;
                        uniform vec3 planeNormal;
                        uniform vec3 planePoint;

                        void main() {
                            float d = dot(planeNormal, vWorldPos - planePoint);
                            if (d < 0.0) {
                                gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
                                return;
                            }
                        `
                            );

                            material.userData.shader = shader;
                        };

                        material.userData._patched = true;
                        material.needsUpdate = true;
                    }
                }
            })
        })
    }
    React.useEffect(() => {
        renderer.localClippingEnabled = true;

        // scene.traverse((obj:any) => {
        //     if (!obj.isMesh) return;

        //     const material = obj.material;
        //     if (!material) return;

        //     // Store original shader
        //     if (!material.userData._patched) {
        //         material.onBeforeCompile = (shader:any) => {

        //             shader.uniforms.planeNormal = { value: planeNormal };
        //             shader.uniforms.planePoint  = { value: planePoint };

        //             // Inject into vertex shader
        //             shader.vertexShader = shader.vertexShader.replace(
        //                 "void main() {",
        //                 `
        //                 varying vec3 vWorldPos;
        //                 void main() {
        //                     vec4 worldPos = modelMatrix * vec4(position, 1.0);
        //                     vWorldPos = worldPos.xyz;
        //                 `
        //             );

        //             // Inject into fragment shader
        //             shader.fragmentShader = shader.fragmentShader.replace(
        //                 "void main() {",
        //                 `
        //                 varying vec3 vWorldPos;
        //                 uniform vec3 planeNormal;
        //                 uniform vec3 planePoint;

        //                 void main() {
        //                     float d = dot(planeNormal, vWorldPos - planePoint);
        //                     if (d < 0.0) {
        //                         gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        //                         return;
        //                     }
        //                 `
        //             );

        //             material.userData.shader = shader;
        //         };

        //         material.userData._patched = true;
        //         material.needsUpdate = true;
        //     }
        // });

    }, [scene, selectedMesh]);


    return null;
};

export default ColliderGpu;
