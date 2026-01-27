import React, { useEffect, useRef } from 'react'
import { useRayCasterController } from '../controllers/use-raycast-controller'
import { useCanvasContext } from '@/threejs/canvas-utils/canvas-provider'
import * as THREE from 'three'

const ScaleDistance = () => {
  const { renderer, camera, scene } = useCanvasContext()
  const [pointMap, setPointMap] = React.useState<THREE.Vector3[]>([])

  const markersRef = useRef<THREE.Mesh[]>([])
  const lineRef = useRef<THREE.Line | null>(null)

  const handleClick = (event: MouseEvent) => {
    const rect = renderer.domElement.getBoundingClientRect()

    mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    raycaster.current.setFromCamera(mouse.current, camera)

    const intersects = raycaster.current.intersectObjects(scene.children, true)

    if (!intersects.length) return

    const point = intersects[0].point.clone()

    setPointMap((prev) => {
      if (prev.length === 1) {
        const dist = point.distanceTo(prev[0])
        console.log('Distance:', dist.toFixed(3))
        return [prev[0], point]
      }
      return [point]
    })
  }

  const { raycaster, mouse } = useRayCasterController({
    customHandleClick: handleClick,
  })

  useEffect(() => {
    // cleanup old markers
    markersRef.current.forEach((m) => scene.remove(m))
    markersRef.current = []

    if (lineRef.current) {
      scene.remove(lineRef.current)
      lineRef.current.geometry.dispose()
      lineRef.current = null
    }

    // create point markers
    pointMap.forEach((point) => {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 24, 24),
        new THREE.MeshBasicMaterial({ color: 0xff3b3b })
      )
      sphere.position.copy(point)
      scene.add(sphere)
      markersRef.current.push(sphere)
    })

    // create line if two points exist
    if (pointMap.length === 2) {
      const geometry = new THREE.BufferGeometry().setFromPoints(pointMap)
      const material = new THREE.LineBasicMaterial({
        color: 0x00ffff,
        linewidth: 2, // (note: ignored on most platforms)
      })
      console.log("Distance:", pointMap[0].distanceTo(pointMap[1]))
      const line = new THREE.Line(geometry, material)
      scene.add(line)
      lineRef.current = line
    }
  }, [pointMap, scene])

  return null
}

export default ScaleDistance
