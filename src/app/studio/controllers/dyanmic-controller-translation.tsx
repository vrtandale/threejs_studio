import React from "react"
import * as THREE from "three"
import { useCanvasContext } from "../../../threejs/canvas-utils/canvas-provider"
import { TransformControls } from "three/examples/jsm/Addons.js"
import { useStudioStore } from "../store/studio-store"

const useController = () => {
  const { scene, camera, renderer } = useCanvasContext()
  const { controllerMovement, recordingFrames, animationFrames, setAnimationFrames } = useStudioStore()
  const controlsRef = React.useRef<TransformControls | null>(null)
  React.useEffect(() => {
    if (!camera || !renderer || !scene || !controllerMovement) return
    const controls = new TransformControls(camera, renderer.domElement)
    controls.setMode(controllerMovement)

    // mark gizmo for raycast filtering
    controls.getHelper().traverse((obj: THREE.Object3D) => {
      obj.userData.isGizmo = true
    })

    scene.add(controls.getHelper())
    controlsRef.current = controls

    return () => {
      controls.dispose()
      scene.remove(controls.getHelper())
      controlsRef.current = null
    }
  }, [scene, camera, renderer, controllerMovement])

  /** attach to new object (auto-removes previous) */
  const attach = React.useCallback((object: THREE.Object3D) => {
    object.matrixAutoUpdate = true
    controlsRef.current?.attach(object)

    controlsRef.current?.addEventListener('objectChange', () => {
      const controlledObject = controlsRef.current?.object
      if (!controlledObject || recordingFrames) return console.log('returning from recordingFrames')

      controlledObject.updateMatrix()
      const newMatrix = controlledObject.matrix.clone()
      const key = controlledObject.uuid

      setAnimationFrames(prev => ({
        ...prev,
        [key]: [...(prev[key] ?? []), newMatrix]
      }))
    })
  }, [animationFrames, setAnimationFrames])



  /** completely hide controller */
  const detach = React.useCallback(() => {
    controlsRef.current?.detach()
  }, [controllerMovement])

  return { attach, detach }
}



export default useController
