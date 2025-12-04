import * as THREE from "three";
import { useCanvasContext } from "../canvas-utils/canvas-provider";
import React from "react";


const SphereGeometry = () => {
    const { scene } = useCanvasContext();

    React.useEffect(() => {
        const cube = new THREE.Mesh(
            new THREE.SphereGeometry(10,32,32),
            new THREE.MeshBasicMaterial({ color: 'blue' })
        );
        scene.add(cube);
        return () => {
            scene.remove(cube);
        };
    }, [scene]);
    return null;
};

export default SphereGeometry;