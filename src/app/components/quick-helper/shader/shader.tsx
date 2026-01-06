import { useCanvasContext } from '@/threejs/canvas-utils/canvas-provider'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const SeaShade = () => {
  const { renderer, scene, camera } = useCanvasContext()

  const seaRef = useRef<THREE.Mesh | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    // Geometry
    const geometry = new THREE.PlaneGeometry(1000, 1000, 256, 256)

    // Material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color('lightblue') }
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;

        void main() { 
          vUv = uv;
          vec3 pos = position;

          float wave1 = sin(pos.x * 0.05 + time) * 10.0;
          float wave2 = sin(pos.y * 0.07 + time * 1.5) * 5.0;

          pos.z += wave1 + wave2;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying vec2 vUv;

        void main() {
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide
    })

    const sea = new THREE.Mesh(geometry, material)
    sea.rotation.x = -Math.PI / 2

    scene.add(sea)

    seaRef.current = sea
    materialRef.current = material

    // Animation loop
    const animate = (time: number) => {
      material.uniforms.time.value = time * 0.001
      renderer.render(scene, camera)
      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      scene.remove(sea)
      geometry.dispose()
      material.dispose()
    }
  }, [renderer, scene, camera,materialRef.current])

  return null
}

export default SeaShade
