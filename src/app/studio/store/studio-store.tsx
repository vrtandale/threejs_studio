import type { TransformControlsMode } from 'three/examples/jsm/Addons.js'
import { create } from 'zustand'
import * as THREE from 'three'
type studioStore = {
  controllerMovement: TransformControlsMode | null,
  setControllerMovement: (obj: TransformControlsMode | null) => void

  singleGeometryRaycast: boolean,
  setSingleGeometryRaycast: (act: boolean) => void

  cameraMode: "orbit" | "first-person",
  setCameraMode: (mode: "orbit" | "first-person") => void

  animationFrames: {
    [key: string]: THREE.Matrix4[]
  },

  recordingFrames: boolean,
  setRecordingFrames: (rec: boolean) => void,

  setAnimationFrames: (
  updater: (prev: Record<string, THREE.Matrix4[]>) => Record<string, THREE.Matrix4[]>
) => void

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
  setLightHelper: (obj) => set({ LightHelper: obj }),

  animationFrames: {},
  setAnimationFrames: (updater) => set(state => ({
  animationFrames: updater(state.animationFrames)
})),

  recordingFrames: false,
  setRecordingFrames: (rec) => set({ recordingFrames: rec }),
}))


type LightType =
  | 'ambient'
  | 'directional'
  | 'point'
  | 'spot'
  | 'hemisphere'
  | 'rectarea'
