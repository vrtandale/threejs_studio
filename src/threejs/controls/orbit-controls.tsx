import { OrbitControls as ThreeOrbitControls } from "three/addons/controls/OrbitControls.js"
import { useCanvasContext } from "../canvas-utils/canvas-provider"
import type { Vector3 } from "three"
import { useStudioStore } from "../../app/studio/store/studio-store"
import React from "react"

const OrbitControls = ({ position }: { position: Vector3 }) => {
  const { camera, renderer } = useCanvasContext()
  const { controllerMovement } = useStudioStore()

  const controlsRef = React.useRef<ThreeOrbitControls | null>(null)

  // create ONCE
  React.useEffect(() => {
    if (!camera || !renderer) return

    const controls = new ThreeOrbitControls(camera, renderer.domElement)
    camera.position.set(position.x, position.y, position.z)

    controls.enableDamping = true
    controls.update()

    controlsRef.current = controls

    return () => {
      controls.dispose()
      controlsRef.current = null
    }
  }, [camera, renderer, position])

  // react to controller movement
  React.useEffect(() => {
    if (!controlsRef.current) return

    controlsRef.current.enableRotate = controllerMovement === null
  }, [controllerMovement])

  return null
}

export default OrbitControls
