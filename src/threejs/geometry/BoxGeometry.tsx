import * as THREE from "three";
import { useCanvasContext } from "../canvas-utils/canvas-provider";
import React, { type RefObject } from "react";


const BoxGeometry = ({ref}:{ref:React.RefObject<THREE.Object3D<THREE.Object3DEventMap>|null >}) => {
    const { scene } = useCanvasContext();

    React.useEffect(() => {
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(Math.random() * 10, Math.random() * 10, 1),
            new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        );
        cube.name='vBox'
        scene.add(cube);
        ref.current=cube
        return () => {
            scene.remove(cube);
        };
    }, [scene]);
    return null;
};

export default BoxGeometry;