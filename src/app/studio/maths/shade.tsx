import * as THREE from 'three';
import React from 'react';
import { useCanvasContext } from '@/threejs/canvas-utils/canvas-provider';
import { fragmentShader, noiseWebglShader, vertexShader } from './shader';

const ShaderWaterSea = () => {
    const { scene } = useCanvasContext();
    const materialRef = React.useRef<THREE.ShaderMaterial | null>(null);

    const createPlane = () => {
        const geometry = new THREE.BoxGeometry(200, 200, 10, 100);
        const texture = new THREE.TextureLoader().load('/velvet/textures/water-viewed-from.jpg');
        const uxtexture = new THREE.TextureLoader().load('/velvet/textures/closeup-pool-water-texture.jpg');
        const uniforms: Record<string, { value: any }> = {};
        uniforms.u_time = { value: 0.0 };
        uniforms.u_resolution = { value: new THREE.Vector2() };
        uniforms.u_LightColor = { value: new THREE.Color('#fdfdfd') };
        uniforms.u_DarkColor = { value: new THREE.Color('#ffffff') };
        uniforms.u_texture = { value: uxtexture };
        uniforms.u_Frequency = { value: 5.0 };
        uniforms.u_NoiseScale = { value: 0.01 };
        uniforms.u_RingScale = { value: 0.06 };
        uniforms.u_Contrast = { value: 4.0 };
        
        const material = new THREE.ShaderMaterial({
            uniforms: {
                ...uniforms,
                time: { value: 0 },
                color: { value: new THREE.Color('lightblue') },
                utexture: { value: texture },
            },
            vertexShader:vertexShader,
            fragmentShader: fragmentShader,
            side: THREE.DoubleSide,
        });
        materialRef.current = material;
        const plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = -Math.PI / 2;
        // plane.rotation.z = -Math.PI / 2;
        return plane;
    };

    const createPlaneSand = () => {
        const geometry = new THREE.BoxGeometry(200, 300, 10, 100);
        const texture= new THREE.TextureLoader().load('/velvet/textures/sand.jpg');
         const vertexShader = `
            uniform float time;
            varying vec2 vUv;
            varying vec4 color;
            varying vec3 vPosition;
            void main() {
                vUv = uv;
                vec3 pos = position;
                pos.z += sin(pos.x * 0.1 ) * 1.0;
                pos.z += tan(pos.x * 0.1 ) * 0.01;
                pos.x += sin(pos.z * 0.1) * 1.0;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                vPosition = pos;
                color = vec4(pos, 1.0);
            }
        `;
        const fragmentShader = `
${noiseWebglShader}
    
uniform float time;
uniform sampler2D utexture;
uniform sampler2D uxtexture;
uniform vec3 u_LightColor;
uniform vec3 u_DarkColor;
uniform float u_Frequency;
uniform float u_NoiseScale;
uniform float u_RingScale;
uniform float u_Contrast;
varying vec2 vUv;
varying vec3 vPosition;
void main() {
    float n = snoise(vUv * 0.1);
    gl_FragColor = texture2D(utexture, vUv*n) * texture2D(uxtexture, vUv) ;
}
        `;
        const material = new THREE.ShaderMaterial({
            uniforms: {
                utexture: { value: texture },
                time: { value: 0 },
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader}
        );
        const plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -5;
        plane.position.z = -50;
        return plane;
    }
    React.useEffect(() => {
        const plane = createPlane()
        const planeSand = createPlaneSand()
        scene.add(plane)
        scene.add(planeSand)
        return () => {
            scene.remove(plane)
            scene.remove(planeSand)
        }
    }, [scene])


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

     return null;
};

export default ShaderWaterSea;