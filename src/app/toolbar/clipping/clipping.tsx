import * as THREE from 'three'
import { useCanvasContext } from '../../../threejs/canvas-utils/canvas-provider';
import React from 'react';
import { useClippingStore } from './clipping-store';

const ClippingTool = () => {
    const { clippingPosition } = useClippingStore();
    const clippingPlane = React.useMemo(() => new THREE.Plane(new THREE.Vector3(1, 0, 0), clippingPosition), []) // proper plane
    const { scene, renderer } = useCanvasContext();
    const helpers = React.useMemo(() => new THREE.Group(), []);
    const [bounds, setBounds] = React.useState<{
        min: number;
        max: number;
        range: number;
    } | null>(null);
    
    React.useEffect(() => {
        helpers.add(new THREE.PlaneHelper(clippingPlane, Number(bounds?.max)*5, 0xff0000));
    }, [bounds?.max,clippingPosition]);
    // Compute bounding box only once when scene is ready
    React.useEffect(() => {
        //@ts-ignore
        const obj = scene?.children?.find(x => x?.isGroup)
        if (!obj) return
        let bbox = new THREE.Box3().setFromObject(obj!);
        let size = bbox.getSize(new THREE.Vector3());
        scene.add(helpers);
        setBounds({
            min: bbox.min.x,
            max: bbox.max.x,
            range: size.x
        });
        if (!bounds) return console.log('Bounds not set yet');
        // Convert percent → world position
        const worldPosition = bounds.min + (bounds.range * (clippingPosition / 100));
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

    }, [clippingPlane.constant, scene, clippingPosition]);

    return null;
};

export default ClippingTool;


