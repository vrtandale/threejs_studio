import React from "react"
import { useCanvasContext } from "../../../threejs/canvas-utils/canvas-provider"
import * as THREE from "three"

const PlaneGeometry = () => {
  const { scene } = useCanvasContext()

  React.useEffect(() => {
    const geometry = new THREE.PlaneGeometry(100, 100, 100, 100)
    const material = new THREE.MeshBasicMaterial({
      color: "grey",
      side: THREE.DoubleSide,
      wireframe: true,
    })

    const mesh = new THREE.Mesh(geometry, material)

    // 👉 rotate plane to act like land / ground
    mesh.rotation.x = -Math.PI / 2

    scene.add(mesh)

    return () => {
      scene.remove(mesh)
      geometry.dispose()
      material.dispose()
    }
  }, [scene])

  return null
}

export default PlaneGeometry
