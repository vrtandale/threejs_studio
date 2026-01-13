import type { TransformControlsMode } from 'three/examples/jsm/Addons.js'
import { create } from 'zustand'
import * as THREE from 'three'
import type { Object3D } from 'three'
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
    id: string,
    active: LightType,
    color: string,
    intensity: number,
    distance: number,
    decay: number,
    angle: number
  }[],
  setLightHelper: (obj: {
    id: string,
    active: LightType,
    color: string,
    intensity: number,
    distance: number,
    decay: number,
    angle: number
  }[]) => void,

  object3d: THREE.Object3D[] | null
  setObject3d: (obj: Object3D[]) => void
  selectedMesh: Object3D | null,
  setSelectedMesh: (obj: Object3D) => void,
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

  object3d: null,
  setObject3d(obj) {
    set({ object3d: obj })
  },
  
  selectedMesh: null,
  setSelectedMesh: (obj) => set({ selectedMesh: obj }),
}))


type LightType =
  | 'ambient'
  | 'directional'
  | 'point'
  | 'spot'
  | 'hemisphere'
  | 'rectarea'
