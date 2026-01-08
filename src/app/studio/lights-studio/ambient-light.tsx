import * as THREE from 'three'
import { useCanvasContext } from '@/threejs/canvas-utils/canvas-provider'
import { useEffect, useRef } from 'react'
import { useModalStore } from '@/app/components/quick-helper/store/upload-modal-store'
import { useStudioStore } from '../store/studio-store'



const useLights = () => {
  const { scene } = useCanvasContext()
  const { LightHelper } = useStudioStore()
  const { setObject3d, object3d } = useModalStore()

  const lightsRef = useRef<THREE.Light[]>([])
  const helpersRef = useRef<THREE.Object3D[]>([])

  useEffect(() => {
    // cleanup
    lightsRef.current.forEach(l => scene.remove(l))
    helpersRef.current.forEach(h => scene.remove(h))

    lightsRef.current = []
    helpersRef.current = []

    const newHelpers: THREE.Object3D[] = []

    LightHelper.forEach((config, index) => {
      const { light, helper } = createLightWithHelper(config)

      light.userData = { id: config.id, type: 'light' }
      light.position.x += index * 2

      scene.add(light)
      lightsRef.current.push(light)

      if (helper) {
        helper.userData = { id: config.id, type: 'light' }
        scene.add(helper)
        helpersRef.current.push(helper)
        newHelpers.push(helper)
      }
    })

    const nonLightObjects =
      object3d?.filter(obj => obj.userData?.type !== 'light') ?? []

    setObject3d([...nonLightObjects, ...newHelpers])

    return () => {
      lightsRef.current.forEach(l => scene.remove(l))
      helpersRef.current.forEach(h => scene.remove(h))
    }
  }, [scene, LightHelper, setObject3d])
}

export default useLights



type LightType =
  | 'ambient'
  | 'directional'
  | 'point'
  | 'spot'
  | 'hemisphere'
  | 'rectarea'

type LightConfig = {
  id: string
  active: LightType
  color: string
  intensity: number
  distance: number
  decay: number
  angle: number
}

export function createLightWithHelper(
  config: LightConfig
): {
  light: THREE.Light
  helper?: THREE.Object3D
} {
  switch (config.active) {
    case 'ambient': {
      const light = new THREE.AmbientLight(
        config.color,
        config.intensity
      )
      return { light }
    }

    case 'directional': {
      const light = new THREE.DirectionalLight(
        config.color,
        config.intensity
      )
      light.position.set(5, 10, 5)

      const helper = new THREE.DirectionalLightHelper(light, 1)
      return { light, helper }
    }

    case 'point': {
      const light = new THREE.PointLight(
        config.color,
        config.intensity,
        config.distance,
        config.decay
      )
      light.position.set(5, 5, 5)

      const helper = new THREE.PointLightHelper(light, 1)
      return { light, helper }
    }

    case 'spot': {
      const light = new THREE.SpotLight(
        config.color,
        config.intensity,
        config.distance,
        config.angle,
        0,
        config.decay
      )
      light.position.set(5, 10, 5)

      const helper = new THREE.SpotLightHelper(light)
      return { light, helper }
    }

    case 'hemisphere': {
      const light = new THREE.HemisphereLight(
        config.color,
        '#444444',
        config.intensity
      )

      const helper = new THREE.HemisphereLightHelper(light, 1)
      return { light, helper }
    }

    case 'rectarea': {
      const light = new THREE.RectAreaLight(
        config.color,
        config.intensity,
        4,
        4
      )
      light.position.set(5, 5, 5)
      light.lookAt(0, 0, 0)

      // RectAreaLight has no official helper
      return { light }
    }

    default:
      throw new Error(`Unsupported light type: ${config.active}`)
  }
}
