import { create } from 'zustand'

type ClippingStore = {
  clippingPosition: number
  setClippingPosition: (position: number) => void
}
export const useClippingStore = create<ClippingStore>((set) => ({
  clippingPosition: 0,
  setClippingPosition: (position: number) => set({ clippingPosition: position }),
}))