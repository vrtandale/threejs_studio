import { useCanvasContext } from "@/threejs/canvas-utils/canvas-provider"
import React from "react"
import * as THREE from "three"
import { useStudioStore } from "../store/studio-store"
const useSphere = () => {
    const { scene } = useCanvasContext()
    const { object3d, setObject3d } = useStudioStore()
    const addSphere = React.useCallback(() => {
        const geometry = new THREE.SphereGeometry(1, 40, 40)
        // randomColorMesh(geometry)
        const material = new THREE.MeshBasicMaterial({ color:'red',wireframe:true })
        const sphere = new THREE.Mesh(geometry, material)

        sphere.position.set(0, 0, 0)
        scene.add(sphere)
        object3d ? setObject3d([...object3d, sphere]) : setObject3d([sphere])
        console.log('Sphere added to the scene')
    }, [scene])

    return addSphere
}

export default useSphere
export function randomColorMesh(geometry: any) {
    var faces = geometry.getAttribute('position').count / 3,
        colors = [];
    for (var i = 0; i < faces; i++) {
        var r = Math.random(),
            g = Math.random(),
            b = Math.random();
        colors.push(r, g, b);
        colors.push(r, g, b);
        colors.push(r, g, b);
    }

    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

}
