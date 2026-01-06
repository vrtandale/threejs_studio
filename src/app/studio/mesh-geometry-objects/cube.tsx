import { useModalStore } from "@/app/components/quick-helper/store/upload-modal-store"
import { useCanvasContext } from "@/threejs/canvas-utils/canvas-provider"
import React from "react"
import * as THREE from "three"
const useCube = () => {
  const { scene } = useCanvasContext()
const {object3d,setObject3d} = useModalStore()
  const addCube = React.useCallback(() => {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshStandardMaterial({ color: 'red' })
    const cube = new THREE.Mesh(geometry, material)
   
    cube.position.set(0, 0, 0)
    scene.add(cube)
    object3d?setObject3d([...object3d,cube]):setObject3d([cube])
    console.log('Cube added to the scene')
  }, [scene])

  return addCube
}

export default useCube
