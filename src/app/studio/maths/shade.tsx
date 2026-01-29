import * as THREE from 'three'
import React from 'react'
import { useCanvasContext } from '@/threejs/canvas-utils/canvas-provider'

const ShaderWaterSea = () => {
    const { scene } = useCanvasContext()
    const materialRef = React.useRef<THREE.ShaderMaterial | null>(null)
    React.useEffect(() => {
        const plane = createPlane()
        scene.add(plane)
        return () => {
            scene.remove(plane)
        }
    }, [])
    const createPlane = () => {
        const geometry = new THREE.BoxGeometry(100, 100, 10, 100)
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color('lightblue') }
            },
            vertexShader: `
                uniform float time;
                varying vec2 vUv;
                varying vec4 color;

                void main() {
                vUv = uv;
                vec3 pos = position;

                pos.z += sin(pos.x * 0.2 + time) * 1.0;
                pos.z += sin(pos.x * 0.3 + time) * 1.0;

                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                color=vec4(pos, 1.0);
            }

            `,
            fragmentShader: `
                uniform float time;
                varying vec4 color;

                void main() {
                vec4 col = color;

                col.z += sin(col.x * 0.2 + time) * 1.0;
                col.z += sin(col.x * 0.3 + time) * 1.0;
                gl_FragColor = col;
                }
            `,
            side: THREE.DoubleSide,
        })
        materialRef.current = material
        const plane = new THREE.Mesh(geometry, material)

        return plane
    }

    React.useEffect(() => {
        let frameId: number
        const animate = () => {
            if (materialRef.current) {
                materialRef.current.uniforms.time.value += 0.01
            }
            frameId = requestAnimationFrame(animate)
        }
        animate()
        return () => cancelAnimationFrame(frameId)
    }, [])
    return null
}

export default ShaderWaterSea