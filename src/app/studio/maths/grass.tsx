import { useCanvasContext } from '@/threejs/canvas-utils/canvas-provider'
import * as THREE from 'three'
import React from 'react'
import { texture } from 'three/src/nodes/TSL.js'
const Grass = () => {
    const { scene } = useCanvasContext()
    const materialRef = React.useRef<THREE.ShaderMaterial | null>(null)

    const fragShader =/* glsl */ `
    varying float vHeight;
    uniform float time;
    uniform sampler2D texture1;
    varying vec2 vUv;
        void main() {
            gl_FragColor =  vec4(0.0, 1.0, 0.0, 0.3); // Green color with alpha based on height and texture alpha
        }
        `
    const vertShader =/* glsl */`
        uniform float time;
        varying vec2 vUv;
        varying float vHeight;
        
        void main() {
            vUv = uv;
            vec3 pos = position;
            vHeight = pos.y; // Pass height to fragment shader
                float angle = sin(time ) * 0.1;
                float c = cos(angle);
                float s = sin(angle);
                mat3 rotationMatrix = mat3(
                    c, s, s,
                    s, c, s,
                    s, s, c
                );
                pos = rotationMatrix * pos;
            
            // pos.z= abs(sin(pos.x * time) ) * 0.05; // Example: Wiggle based on X and Time
            // pos.x += sin(time + pos.z) * 0.1; // Example: Wiggle based on Z and Time
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
        `


    React.useEffect(() => {
        if (!scene) return
        const grass = generateGrass()
        scene.add(grass)
        return () => {
            scene.remove(grass)
        }
    }, [])

    const generateGrass = () => {
        const uniforms: { [key: string]: THREE.IUniform } = {
            time: { value: 0 },
            texture1: { value: new THREE.TextureLoader().load('/velvet/textures/sand.jpg') },
        }



        // const planeGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 10);
        // const planeMaterial = new THREE.MeshBasicMaterial({ map: uniforms.texture1.value, side: THREE.DoubleSide });
        // const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        // plane.rotation.x = -Math.PI / 2;
        // scene?.add(plane);

        const geometry = new THREE.CylinderGeometry(0, 4, 100, 10, 1, false)
        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertShader,
            fragmentShader: fragShader,
            side: THREE.DoubleSide,
            transparent: true,

        })
        materialRef.current = material
        const mesh = new THREE.Mesh(geometry, material)
        const grassCount = 10000
        const grassGroup = new THREE.Group()
        for (let i = 0; i < grassCount; i++) {
            const instance = mesh.clone()
            instance.position.set(
                (Math.random() - 0.5) * 1000,
                0,
                (Math.random() - 0.5) * 1000
            )
            instance.rotation.y = Math.random() * Math.PI * 2
            instance.scale.setScalar(0.5 + Math.random() * 0.5)
            grassGroup.add(instance)
        }

        return grassGroup
    }

    React.useEffect(() => {
        let frameId: number;
        const animate = () => {
            if (materialRef.current) {
                materialRef.current.uniforms.time.value += 0.01;
            }
            frameId = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(frameId);
    }, []);
    return null
}

export default Grass