import * as THREE from "three";
import { useCanvasContext } from "../canvas-utils/canvas-provider";
import React from "react";


const BoxGeometry = () => {
    const { scene } = useCanvasContext();

    React.useEffect(() => {
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(Math.random() * 10, Math.random() * 10, 1),
            new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        );
        scene.add(cube);
        return () => {
            scene.remove(cube);
        };
    }, [scene]);
    return null;
};

export default BoxGeometry;