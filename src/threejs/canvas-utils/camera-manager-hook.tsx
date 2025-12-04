import React from 'react';
import * as THREE from 'three';
const useCamera = ({ fov }: { fov: number }) => {
    const camera = React.useCallback(() => {
        const camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);
       
        return camera;
    }, []);
    return camera();
}

export default useCamera