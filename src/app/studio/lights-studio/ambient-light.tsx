import * as THREE from 'three'
import { useCanvasContext } from '@/threejs/canvas-utils/canvas-provider'
import { useEffect, useRef } from 'react'
import { useModalStore } from '@/app/components/quick-helper/store/upload-modal-store'
import { useStudioStore } from '../store/studio-store'

const usePointLight = () => {
    const { scene } = useCanvasContext()
    const { LightHelper } = useStudioStore()
    const { setObject3d, object3d } = useModalStore()

    const lightsRef = useRef<THREE.PointLight[]>([])
    const helpersRef = useRef<THREE.PointLightHelper[]>([])

    useEffect(() => {
        // Remove old lights
        lightsRef.current.forEach(light => scene.remove(light))
        helpersRef.current.forEach(helper => scene.remove(helper))
        console.log('Updating Point Lights', LightHelper)
        lightsRef.current = []
        helpersRef.current = []

        const newHelpers: THREE.Object3D[] = []

        LightHelper.forEach((config, index) => {
            if (config.active !== 'point') return

            const light = new THREE.PointLight(
                config.color,
                config.intensity,
                config.distance,
                config.decay
            )

            // simple deterministic placement (can improve later)
            light.position.set(5 + index * 2, 5, 5)

            scene.add(light)
            lightsRef.current.push(light)

            const helper = new THREE.PointLightHelper(light, 1)
            scene.add(helper)
            helper.userData={id: config.id,type:'light'}
            helpersRef.current.push(helper)
            newHelpers.push(helper)
        })
        const removedObjects = object3d?.filter(obj=>obj.userData.type!=='light')

        removedObjects?setObject3d([...removedObjects, ...newHelpers]):setObject3d(newHelpers)

        return () => {
            lightsRef.current.forEach(light => scene.remove(light))
            helpersRef.current.forEach(helper => scene.remove(helper))
            lightsRef.current = []
            helpersRef.current = []
        }
    }, [scene, LightHelper, setObject3d])
}

export default usePointLight
