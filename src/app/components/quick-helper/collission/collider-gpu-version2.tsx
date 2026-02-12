import { useStudioStore } from '@/app/studio/store/studio-store'
import { useCanvasContext } from '@/threejs/canvas-utils/canvas-provider'
import React, { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { VertexNormalsHelper } from 'three/examples/jsm/Addons.js'

const ColliderCPUv2 = () => {
    const { scene, camera, renderer } = useCanvasContext()
    const { selectedMesh } = useStudioStore()


    useEffect(() => {
        if (!scene || !camera || !renderer || !selectedMesh) return

        let rafId: number

        const animate = () => {
            rafId = requestAnimationFrame(animate)
            colorVertex(selectedMesh as THREE.Mesh, scene)

        }
        rafId = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(rafId)
        }
    }, [scene, camera, renderer, selectedMesh])


    function colorVertex(selectedMesh: THREE.Mesh, scene: THREE.Scene) {
        if (!selectedMesh) return;

        const mesh = selectedMesh;
        const geometry = mesh.geometry as THREE.BufferGeometry;

        const indexedGeometry = geometry.index
            ? geometry
            : geometry.toNonIndexed();

        const positionAttr = indexedGeometry.attributes.position;
        const indexAttr = indexedGeometry.index;

        const raycaster = new THREE.Raycaster();
        const threshold = 0.1; // collision distance threshold

        const colors = new Float32Array(positionAttr.count * 3);

        const a = new THREE.Vector3();
        const b = new THREE.Vector3();
        const c = new THREE.Vector3();
        const center = new THREE.Vector3();
        const normal = new THREE.Vector3();
        const edge1 = new THREE.Vector3();
        const edge2 = new THREE.Vector3();

        for (let i = 0; i < indexAttr.count; i += 3) {
            const i0 = indexAttr.getX(i);
            const i1 = indexAttr.getX(i + 1);
            const i2 = indexAttr.getX(i + 2);

            a.fromBufferAttribute(positionAttr, i0);
            b.fromBufferAttribute(positionAttr, i1);
            c.fromBufferAttribute(positionAttr, i2);

            a.applyMatrix4(mesh.matrixWorld);
            b.applyMatrix4(mesh.matrixWorld);
            c.applyMatrix4(mesh.matrixWorld);

            center.copy(a).add(b).add(c).divideScalar(3);

            edge1.subVectors(b, a);
            edge2.subVectors(c, a);
            normal.crossVectors(edge1, edge2).normalize().negate(); // DON'T negate

            // Offset ray origin slightly along normal to avoid self-intersection
            const rayOrigin = center.clone().add(normal.clone().multiplyScalar(0.001));
            raycaster.set(rayOrigin, normal);
            raycaster.far = 5.0; // Maximum ray distance (default is Infinity)
            raycaster.near = 0.0; // Minimum ray distance (default is 0)
            const intersects = raycaster.intersectObjects(
                scene.children.filter(obj => obj !== mesh && !obj.userData?.isGizmo),
                true
            );

            // Color green if collision detected within threshold
            if (intersects.length > 0 && intersects[0].distance > threshold) {
                console.log('intersecting')
                colors[i0 * 3] = 0; colors[i0 * 3 + 1] = 1; colors[i0 * 3 + 2] = 1;
                colors[i1 * 3] = 0; colors[i1 * 3 + 1] = 1; colors[i1 * 3 + 2] = 1;
                colors[i2 * 3] = 0; colors[i2 * 3 + 1] = 1; colors[i2 * 3 + 2] = 1;
            }
            else{
                colors[i0 * 3] = 1; colors[i0 * 3 + 1] = 0; colors[i0 * 3 + 2] = 0;
                colors[i1 * 3] = 1; colors[i1 * 3 + 1] = 0; colors[i1 * 3 + 2] = 0;
                colors[i2 * 3] = 1; colors[i2 * 3 + 1] = 0; colors[i2 * 3 + 2] = 0;
            }
        }

    
        indexedGeometry.setAttribute(
            "color",
            new THREE.BufferAttribute(colors, 3)
        );
        indexedGeometry.attributes.color.needsUpdate = true;
    }

    return null
}

export default ColliderCPUv2

