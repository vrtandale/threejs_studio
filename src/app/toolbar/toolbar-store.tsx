import { create } from 'zustand'

type toolbarStore = {
  showQuickOptions: boolean
  setQuickOptions: (showQuickOptions: boolean) => void
}
export const useToolbarStore = create<toolbarStore>((set) => ({
  showQuickOptions: false,
  setQuickOptions: (showQuickOptions: boolean) => set({ showQuickOptions: showQuickOptions }),
}))