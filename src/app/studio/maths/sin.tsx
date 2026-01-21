import { useCanvasContext } from '@/threejs/canvas-utils/canvas-provider'
import React from 'react'
import * as THREE from 'three'

const Sin = () => {
  const { scene } = useCanvasContext()
  const linesRef = React.useRef<THREE.Line[]>([])
  const clock = React.useRef(new THREE.Clock())

  React.useEffect(() => {
    const lineCount = 100

    for (let z = 0; z < lineCount; z++) {
      const line = createLine(z)
      linesRef.current.push(line)
      scene.add(line)
    }

    animate()
  }, [])

  const createLine = (z: number) => {
    const points = 100
    const vertices = new Float32Array(points * 3)

    for (let i = 0; i < points; i++) {
      const x = i - points / 2
      const y = 0
      vertices.set([x, y, z], i * 3)
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

    const material = new THREE.LineBasicMaterial({ color: 'blue' })
    const line = new THREE.Line(geometry, material)

    // store per-line phase
    ;(line as any).phase = z * 0.3

    return line
  }

  const animate = () => {
    requestAnimationFrame(animate)
    const time = clock.current.getElapsedTime()

    linesRef.current.forEach((line) => {
      const pos = line.geometry.attributes.position as THREE.BufferAttribute
      const phase = (line as any).phase

      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i)
        const y = 5 * Math.cos(0.2 * x + time + phase)
        pos.setY(i, y)
      }

      pos.needsUpdate = true
    })
  }

  return null
}

export default Sin
