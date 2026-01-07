import { Object3D } from 'three'
import { create } from 'zustand'

type UploadModalStore = {
  object3d: Object3D[]|null
  setObject3d: (obj: Object3D[]) => void
  selectedMesh:Object3D|null,
  setSelectedMesh:(obj:Object3D)=>void,

}
export const useModalStore = create<UploadModalStore>((set) => ({
    object3d:null,
    setObject3d(obj) {
        set({object3d:obj})
    },
    selectedMesh:null,
    setSelectedMesh:(obj)=>set({selectedMesh:obj}),
  

}))