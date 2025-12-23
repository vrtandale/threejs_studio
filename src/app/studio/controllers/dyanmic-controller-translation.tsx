import React from "react"
import * as THREE from "three"
import { useCanvasContext } from "../../../threejs/canvas-utils/canvas-provider"
import { TransformControls } from "three/examples/jsm/Addons.js"

const useAddTranslationController = () => {
  const { scene, renderer, camera } = useCanvasContext()

  return React.useCallback(
    (object: THREE.Object3D) => {
      const controls = new TransformControls(camera, renderer.domElement)

      controls.attach(object)
      controls.setMode("translate") // translate | rotate | scale

      // mark gizmo for raycast filtering
      controls.getHelper().traverse((obj:THREE.Object3D) => {
        obj.userData.isGizmo = true
      })

      scene.add(controls.getHelper())

      return () => {
        controls.detach()
        scene.remove(controls.getHelper())
        controls.dispose()
      }
    },
    [scene, camera, renderer]
  )
}

export default useAddTranslationController
