import React from 'react'
import * as THREE from 'three'
import { useCanvasContext } from '../../../threejs/canvas-utils/canvas-provider'
import useKeyboardControls from '../keyboard-controls/keyboard-controls'
import { useStudioStore } from '../store/studio-store'

const useFirstPersonCamera = (
  moveSpeed: number = 0.1,
  rotationSpeed: number = 0.03
) => {
  const { scene, camera } = useCanvasContext()
  const keys = useKeyboardControls()
  const playerRef = React.useRef<THREE.Object3D | null>(null)
  const { cameraMode, setCameraMode } = useStudioStore()

  /* -------------------- Create Player Controller -------------------- */
  React.useEffect(() => {
    if (!scene || !camera || cameraMode !== "first-person") return

    // Player root object
    const player = new THREE.Object3D()
    player.position.set(0, 0, 0)
    playerRef.current = player
    scene.add(player)

    // Optional visible body (debug)
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 1.6, 0.5),
      new THREE.MeshStandardMaterial({ color: 0x00ff00 })
    )
    body.position.y = 0.8
    player.add(body)

    // Camera setup
    // camera.position.set(10, 10, 10)
    player.add(camera)

    return () => {
      scene.remove(player)
      body.geometry.dispose()
      body.material.dispose()
    }
  }, [scene, camera,cameraMode])

  /* -------------------- Movement & Rotation -------------------- */
  React.useEffect(() => {
    if (!camera || !playerRef.current||cameraMode !== "first-person") return

    const player = playerRef.current
    const direction = new THREE.Vector3()

    const update = () => {
      const delta = 0.51

      // Rotation (A / D)
      if (keys.current['KeyA']) {
        player.rotation.y += rotationSpeed * delta
      }
      if (keys.current['KeyD']) {
        player.rotation.y -= rotationSpeed * delta
      }

      // Movement direction
      direction.set(0, 0, 0)
      if (keys.current['KeyW']) direction.z -= 1
      if (keys.current['KeyS']) direction.z += 1

      if (keys.current['Space']) direction.y =  1
      if (keys.current['ShiftRight']) {
        direction.y =  - 1
      }
    if (!keys.current['Space'])  player.position.setY(0)
      if (direction) {
        direction.normalize()
        direction.applyAxisAngle(
          new THREE.Vector3(0, 1, 0),
          player.rotation.y
        )
        player.position.addScaledVector(direction, moveSpeed * delta)
      }

      requestAnimationFrame(update)
    }

    update()
  }, [camera, keys, moveSpeed, rotationSpeed,cameraMode])

  return null
}

export default useFirstPersonCamera
