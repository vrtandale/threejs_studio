import React from "react"
import * as THREE from "three"
const useRenderer = () => {
    const renderer= React.useCallback(() => {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        return renderer;
    }, []);

    return renderer();
}

export default useRenderer