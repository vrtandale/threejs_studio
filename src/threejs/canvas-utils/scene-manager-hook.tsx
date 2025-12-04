import React from 'react';
import * as THREE from 'three';
const useScene = () => {
  const scene = React.useCallback(() => {
    const scene = new THREE.Scene();
    return scene;
  }, []);
  return scene();
}

export default useScene