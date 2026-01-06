import * as THREE from 'three'
import { useCanvasContext } from '@/threejs/canvas-utils/canvas-provider'
import React from 'react'
import { useModalStore } from '@/app/components/quick-helper/store/upload-modal-store'

const usePointLight = () => {
  const { scene } = useCanvasContext()
  const {object3d,setObject3d,LightHelper}=useModalStore()
  console.log("Light Helper in usePointLight:", LightHelper)
  const addPointLight = React.useCallback(() => {
    const pointLight = new THREE.PointLight(LightHelper.color, LightHelper.intensity, LightHelper.distance, LightHelper.decay);
    pointLight.position.set(5, 5, 5)
    console.log("Adding Point Light:", LightHelper)
    scene.add(pointLight)
    const sphereSize = 1;
    const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
    scene.add( pointLightHelper );
    object3d ? setObject3d([...object3d, pointLightHelper]) : setObject3d([pointLightHelper])
  }, [scene,LightHelper.active,LightHelper.color,LightHelper.intensity,LightHelper.distance,LightHelper.decay])

  return addPointLight
}

export default usePointLight