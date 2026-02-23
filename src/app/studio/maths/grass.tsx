import { useCanvasContext } from '@/threejs/canvas-utils/canvas-provider'
import * as THREE from 'three'
import React from 'react'
import { texture } from 'three/src/nodes/TSL.js'
const Grass = () => {
    const { scene } = useCanvasContext()
    const materialRef = React.useRef<THREE.ShaderMaterial | null>(null)

    const fragShader =/* glsl */ `
        #include <common>
        #include <lights_pars_begin>
        varying float vHeight;
        uniform float time;
        uniform sampler2D texture1;
        varying vec3 vNormal;
        varying vec2 vUv;
        
        void main() {
            vec3 normal = normalize(vNormal);
            vec3 light = vec3(0.5); // Ambient light
            
            #if NUM_DIR_LIGHTS > 0
                for (int i = 0; i < NUM_DIR_LIGHTS; i++) {
                    vec3 lightDir = directionalLights[i].direction;
                    float diff = max(dot(normal, -lightDir), 0.0);
                    light += diff * directionalLights[i].color;
                }
            #endif
            
            vec4 texColor = texture2D(texture1, vUv);
            gl_FragColor = vec4(texColor.rgb * light, texColor.a);
        }
        `
    const vertShader =/* glsl */`
        uniform float time;
        varying vec2 vUv;
        varying float vHeight;
        varying vec3 vNormal;
        
        void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            
            vec3 pos = position;
            vHeight = pos.y;
            
            float angle = sin(time)*0.2;
            float c = cos(angle);
            float s = sin(angle);
            mat3 rotationMatrix = mat3(
                1.0, pos.x*s, pos.x*s,
                0.1, 1.0, s,
                0.0, 0.0, 1.0
            );
            pos = rotationMatrix * pos;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
        `


    React.useEffect(() => {
        if (!scene) return
        const grass = generateGrass()
        const landMesh = land()

        scene.add(grass, landMesh)
        return () => {
            scene.remove(grass, landMesh)
        }
    }, [])

    const generateGrass = () => {
        const uniforms: { [key: string]: THREE.IUniform } = {
            time: { value: 0 },
            texture1: { value: new THREE.TextureLoader().load('/velvet/textures/grass_2.jpg') },
        }
        const geometry = new THREE.CylinderGeometry(1, 5, 50, 10, 10, true)
        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertShader,
            fragmentShader: fragShader,
            side: THREE.DoubleSide,
            transparent: true,
            shadowSide: 0,
        })
        materialRef.current = material
        const mesh = new THREE.Mesh(geometry, material)
        const grassCount = 30000
        const grassGroup = new THREE.Group()
        for (let i = 0; i < grassCount; i++) {
            const instance = mesh.clone()
            instance.position.set(
                (Math.random() - 0.5) * 1000,
                0,
                (Math.random() - 0.5) * 1000
            )
            instance.rotation.y = Math.random() * Math.PI * 2
            instance.scale.set(Math.random(), Math.random(), Math.random())
            grassGroup.add(instance)
        }

        return grassGroup
    }

    const land = () => {
        const geom = new THREE.PlaneGeometry(1000, 1000)
        const texture = new THREE.TextureLoader().load('/velvet/textures/sand_2.jpg')
        texture.wrapS = THREE.RepeatWrapping
        texture.wrapT = THREE.RepeatWrapping
        const material = new THREE.MeshBasicMaterial({ map: texture })
        const mesh = new THREE.Mesh(geom, material)
        mesh.rotateX(-Math.PI / 2)
        mesh.position.setY(-10)
        return mesh
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