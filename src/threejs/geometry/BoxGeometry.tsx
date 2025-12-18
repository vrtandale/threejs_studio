import * as THREE from "three";
import { useCanvasContext } from "../canvas-utils/canvas-provider";
import React, { type RefObject } from "react";


const BoxGeometry = ({ref,color="red",pos=new THREE.Vector3(1,1,1)}:{ref?:React.RefObject<THREE.Object3D<THREE.Object3DEventMap>|null >,color?:string,pos?:THREE.Vector3}) => {
    const { scene } = useCanvasContext();

    React.useEffect(() => {
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(pos.x,pos.y,pos.z),
            new THREE.MeshBasicMaterial({ color: color })
        );
        scene.add(cube);
        if(ref){
            ref.current=cube}
        return () => {
            scene.remove(cube);
        };
    }, [scene]);
    return null;
};

export default BoxGeometry;