import React from 'react'
import { useCanvasContext } from "../canvas-utils/canvas-provider";
import * as THREE from "three";
import type { CanvasType } from './canvas-type';
const useCanvas = ({background}:Omit<CanvasType,'children'>) => {
    const { scene, camera, renderer } = useCanvasContext();
    const mountRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!mountRef.current) return;
        mountRef.current.appendChild(renderer.domElement);
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            scene.background = new THREE.Color(background || 'white');
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        animate();

        return () => {
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, [renderer, scene, camera]);
    return {mountRef};
}

export default useCanvas