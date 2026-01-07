import type { TransformControlsMode } from 'three/examples/jsm/Addons.js'
import { create } from 'zustand'

type studioStore = {
  controllerMovement: TransformControlsMode | null,
  setControllerMovement: (obj: TransformControlsMode | null) => void

  singleGeometryRaycast: boolean,
  setSingleGeometryRaycast: (act: boolean) => void

  cameraMode: "orbit" | "first-person",
  setCameraMode: (mode: "orbit" | "first-person") => void

  LightHelper: {
    id:string,
    active: LightType,
    color: string,
    intensity: number,
    distance: number,
    decay: number,
    angle: number
  }[],
  setLightHelper: (obj: {
    id:string,
    active: LightType,
    color: string,
    intensity: number,
    distance: number,
    decay: number,
    angle: number
  }[]) => void,
}
export const useStudioStore = create<studioStore>((set) => ({
  controllerMovement: null,
  setControllerMovement: (controllerMovement) => set({ controllerMovement: controllerMovement }),

  setSingleGeometryRaycast: (act) => set({ singleGeometryRaycast: act }),
  singleGeometryRaycast: false,

  cameraMode: "orbit",
  setCameraMode: (mode) => set({ cameraMode: mode }),

  LightHelper: [],
  setLightHelper: (obj) => set({ LightHelper: obj })
}))


type LightType =
  | 'ambient'
  | 'directional'
  | 'point'
  | 'spot'
  | 'hemisphere'
  | 'rectarea'
