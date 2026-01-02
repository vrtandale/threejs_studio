import * as THREE from 'three'
import { useCanvasContext } from '@/threejs/canvas-utils/canvas-provider'
import React from 'react'
import { useModalStore } from '@/app/toolbar/store/upload-modal-store'
const usePointLight = () => {
  const { scene } = useCanvasContext()
  const {object3d,setObject3d}=useModalStore()
  const addPointLight = React.useCallback(() => {
    const pointLight = new THREE.PointLight('blue', 5000)
    pointLight.position.set(5, 5, 5)
    
    scene.add(pointLight)
    const sphereSize = 1;
    const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
    console.log('Point light added to the scene')
    scene.add( pointLightHelper );
    object3d ? setObject3d([...object3d, pointLightHelper]) : setObject3d([pointLightHelper])
  }, [scene])

  return addPointLight
}

export default usePointLight