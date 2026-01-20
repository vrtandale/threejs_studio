import { useCanvasContext } from '@/threejs/canvas-utils/canvas-provider';
import React from 'react';
import * as THREE from 'three';
const Sin = () => {
    const { scene } = useCanvasContext();
    React.useEffect(() => {
        custom();
    }, []);
    const custom=()=>{
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const points = 100;
        for (let i = 0; i < points; i++) {
            const x = i - points / 2;
            const y = 5*Math.sin(0.2 * i - points / 2);
            console.log(y)
            const z = 0;
            vertices.push(x, y, z);
        }
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
        const sineWave = new THREE.Line(geometry, material);
        scene.add(sineWave);
    }
  return null
}

export default Sin