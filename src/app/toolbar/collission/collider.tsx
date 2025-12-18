import { useEffect, useRef } from "react"
import { useCanvasContext } from "../../../threejs/canvas-utils/canvas-provider"
import BoxGeometry from "../../../threejs/geometry/BoxGeometry"
import {
  Object3D,
  Raycaster,
  Vector3,
  Mesh,
  MeshStandardMaterial,
} from "three"
import { TransformControls } from "three/addons/controls/TransformControls.js"

const ColliderObject = () => {
  const { scene, camera, renderer } = useCanvasContext()
  const refBox = useRef<Object3D>(null)

  const raycaster = useRef(new Raycaster())
  const direction = useRef(new Vector3())

  useEffect(() => {
    let frameId: number

    const checkCollision = () => {
      if (!camera || !refBox.current) return

      // ray direction from box
      refBox.current.getWorldDirection(direction.current)
      raycaster.current.set(refBox.current.position, direction.current)

      const intersects = raycaster.current.intersectObjects(
        scene.children,
        true
      )

      // 🔹 reset all mesh colors

      // 🔹 color hit objects
      intersects.forEach(hit => {
        const mesh = hit.object as Mesh
        const mat = mesh.material as MeshStandardMaterial
        mat.color.set("orange")
      })

      frameId = requestAnimationFrame(checkCollision)
    }

    checkCollision()
    return () => cancelAnimationFrame(frameId)
  }, [scene, camera])

  useEffect(() => {
    if (!refBox.current) return

    const control = new TransformControls(camera, renderer.domElement)
    control.attach(refBox.current)
    scene.add(control.getHelper())

    return () => {
      control.detach()
    }
  }, [camera, renderer, scene])

  return <BoxGeometry ref={refBox} color="orange"/>
}

export default ColliderObject
