import { useCanvasContext } from "@/threejs/canvas-utils/canvas-provider"
import React from "react"
import * as THREE from "three"
import { useStudioStore } from "../store/studio-store"
const useSphere = () => {
    const { scene } = useCanvasContext()
    const { object3d, setObject3d } = useStudioStore()
    const addSphere = React.useCallback(() => {
        const geometry = new THREE.SphereGeometry(1, 32, 32)
        const material = new THREE.MeshStandardMaterial({ color: 'red' })
        const sphere = new THREE.Mesh(geometry, material)

        sphere.position.set(0, 0, 0)
        scene.add(sphere)
        object3d ? setObject3d([...object3d, sphere]) : setObject3d([sphere])
        console.log('Sphere added to the scene')
    }, [scene])

    return addSphere
}

export default useSphere
