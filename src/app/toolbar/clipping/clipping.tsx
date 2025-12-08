import * as THREE from 'three'
import { useCanvasContext } from '../../../threejs/canvas-utils/canvas-provider';
import React from 'react';
import { useClippingStore } from './clipping-store';

const ClippingTool = () => {
    const [clipingPosition, setClippingPosition] = React.useState(0);
    const clippingPlane = React.useMemo(()=>new THREE.Plane(new THREE.Vector3(1, 0, 0), clipingPosition),[]) // proper plane
    useClippingStore((c)=>setClippingPosition(c.clippingPosition));
    const { scene, renderer } = useCanvasContext();

     const [bounds, setBounds] = React.useState<{
        min: number;
        max: number;
        range: number;
     }|null>(null);
    // Compute bounding box only once when scene is ready
    React.useEffect(() => {
        //@ts-ignore
        const obj=scene?.children?.find(x=>x?.isGroup)
        if(!obj)return
        console.log(obj)
        let bbox = new THREE.Box3().setFromObject(obj!);
        let size = bbox.getSize(new THREE.Vector3());
        setBounds({
            min: bbox.min.x,
            max: bbox.max.x,
            range: size.x
        });
    }, [scene.children,clipingPosition]);

    React.useEffect(() => {
         if (!bounds) return console.log('Bounds not set yet');
        // Convert percent → world position
        const worldPosition =
            bounds.min + (bounds.range * (clipingPosition / 100));
        clippingPlane.constant = -worldPosition; 
        clippingPlane.set(new THREE.Vector3(1, 0, 0), -worldPosition)  
        renderer.localClippingEnabled = true;
        scene.traverse((child: any) => {
            if (child.isMesh && clippingPlane) {
                const mat = child.material;

                // Some meshes may have multi-material
                if (Array.isArray(mat)) {
                    mat.forEach(m => (m.clippingPlanes = [clippingPlane]));
                } else {
                    mat.clippingPlanes = [clippingPlane];
                }
            }
        });
        return () => {
        };

    }, [clippingPlane.constant,scene,clipingPosition]);

    return null;
};

export default ClippingTool;


