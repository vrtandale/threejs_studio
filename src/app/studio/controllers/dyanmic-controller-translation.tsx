import React from "react"
import * as THREE from "three"
import { useCanvasContext } from "../../../threejs/canvas-utils/canvas-provider"
import { TransformControls } from "three/examples/jsm/Addons.js"

const useTransformController = () => {
  const { scene, camera, renderer } = useCanvasContext()

  const controlsRef = React.useRef<TransformControls | null>(null)

  React.useEffect(() => {
    if (!camera || !renderer || !scene) return

    const controls = new TransformControls(camera, renderer.domElement)
    controls.setMode("translate")

    // mark gizmo for raycast filtering
    controls.getHelper().traverse((obj:THREE.Object3D) => {
      obj.userData.isGizmo = true
    })

    scene.add(controls.getHelper())
    controlsRef.current = controls

    return () => {
      controls.dispose()
      scene.remove(controls.getHelper())
      controlsRef.current = null
    }
  }, [scene, camera, renderer])

  /** attach to new object (auto-removes previous) */
  const attach = React.useCallback((object: THREE.Object3D) => {
    controlsRef.current?.attach(object)
  }, [])

  /** completely hide controller */
  const detach = React.useCallback(() => {
    controlsRef.current?.detach()
  }, [])

  return { attach, detach }
}

export default useTransformController
