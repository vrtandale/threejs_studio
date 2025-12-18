import React, { useEffect, useRef } from "react"
import * as THREE from "three"
import { useCanvasContext } from "../canvas-utils/canvas-provider"

type LineObjProps = {
  points: THREE.Vector3[]
  color?: string
}

const LineObj = ({ points, color = "red" }: LineObjProps) => {
  const { scene } = useCanvasContext()
  const lineRef = useRef<THREE.Line | null>(null)

  useEffect(() => {
    console.log(points)
    if (points.length < 2) return

    // 🔹 geometry
    const geometry = new THREE.BufferGeometry()
    const vertices = new Float32Array(
      points.flatMap(p => [p.x, p.y, p.z])
    )
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(vertices, 3)
    )

    // 🔹 material
    const material = new THREE.LineBasicMaterial({ color,side:THREE.DoubleSide })

    // 🔹 line
    const line = new THREE.Line(geometry, material)
    lineRef.current = line
    scene.add(line)

    // 🔥 cleanup
    return () => {
      scene.remove(line)
      geometry.dispose()
      material.dispose()
    }
  }, [points, color, scene])

  return null
}

export default LineObj
