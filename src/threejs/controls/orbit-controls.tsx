import { OrbitControls as ThreeOrbitControls } from "three/addons/controls/OrbitControls.js"
import { useCanvasContext } from "../canvas-utils/canvas-provider"
import type { Vector3 } from "three"
import { useStudioStore } from "../../app/studio/store/studio-store"
import React from "react"

const OrbitControls = () => {
  const { camera, renderer } = useCanvasContext()
  const { controllerMovement } = useStudioStore()
  const {cameraMode} = useStudioStore()
  const controlsRef = React.useRef<ThreeOrbitControls | null>(null)

  // create ONCE
  React.useEffect(() => {
    if (!camera || !renderer || cameraMode !== "orbit") return console.log("no camera or renderer")
    
    const controls = new ThreeOrbitControls(camera, renderer.domElement)
    camera.position.set(10, 10, 10)
    controls.update()

    controlsRef.current = controls

    return () => {
      controls.dispose()
      controlsRef.current = null
    }
  }, [camera, renderer,cameraMode])

  // react to controller movement
  React.useEffect(() => {
    if (!controlsRef.current) return

    controlsRef.current.enableRotate = controllerMovement === null
    controlsRef.current.update()
  }, [controllerMovement, cameraMode])

  return null
}

export default OrbitControls
