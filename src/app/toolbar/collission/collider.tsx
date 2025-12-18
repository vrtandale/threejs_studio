import  { useEffect, useRef } from "react"
import { useCanvasContext } from "../../../threejs/canvas-utils/canvas-provider"
import BoxGeometry from "../../../threejs/geometry/BoxGeometry"
import { Object3D, Raycaster, Vector3 } from "three"
import { TransformControls } from 'three/addons/controls/TransformControls.js';

const ColliderObject = () => {
  const { scene, camera,renderer } = useCanvasContext()
  const refBox = useRef<Object3D>(null)

  const raycaster = useRef(new Raycaster())
  const direction = useRef(new Vector3())


  useEffect(() => {
    let frameId: number

    const checkCollision = () => {
      if (!camera) return

      // get camera forward direction
      refBox.current.getWorldDirection(direction.current)

      // update raycaster
      raycaster.current.set(refBox.current?.position, direction.current)

      const intersects = raycaster.current.intersectObjects(
        scene.children,
        true
      )

      if (intersects.length > 0) {
        intersects.map((x)=>console.log('--->',x.object.name))
      }

      frameId = requestAnimationFrame(checkCollision)
    }

    checkCollision()

    return () => cancelAnimationFrame(frameId)
  }, [scene, camera,refBox.current?.position])

		let control = new TransformControls( camera, renderer.domElement );
    refBox.current&& control.attach(refBox.current)
    const gizmo = control.getHelper()
    scene.add(gizmo)
  return (
    <>
    <BoxGeometry ref={refBox}/>
    </>
  )
}

export default ColliderObject
