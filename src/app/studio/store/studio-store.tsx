import type { TransformControlsMode } from 'three/examples/jsm/Addons.js'
import { create } from 'zustand'

type studioStore = {
    controllerMovement:TransformControlsMode|null,
    setControllerMovement:(obj:TransformControlsMode|null)=>void
}
export const useStudioStore = create<studioStore>((set) => ({
  controllerMovement:null,
  setControllerMovement: (controllerMovement) => set({ controllerMovement: controllerMovement }),
}))