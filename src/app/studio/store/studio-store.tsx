import type { Object3D } from 'three'
import { create } from 'zustand'

type studioStore = {
    selectedModalsToAddController:Object3D[],
    setSelectedModalsToAddController:(obj:Object3D[])=>void
}
export const useStudioStore = create<studioStore>((set) => ({
  selectedModalsToAddController: [],
  setSelectedModalsToAddController: (selectedModalsToAddController: Object3D[]) => set({ selectedModalsToAddController: selectedModalsToAddController }),
}))