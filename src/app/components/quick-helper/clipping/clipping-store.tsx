import { Vector3 } from 'three'
import { create } from 'zustand'

type ClippingStore = {
  clippingPosition: number
  setClippingPosition: (position: number) => void
  clipingOrientation: Vector3
  setClippingOrientation: (orientation:Vector3) => void
}
export const useClippingStore = create<ClippingStore>((set) => ({
  clippingPosition: 0,
  setClippingPosition: (position: number) => set({ clippingPosition: position }),
  clipingOrientation: new Vector3(1,0,0),
  setClippingOrientation: (orientation:Vector3) => set({ clipingOrientation: orientation }),
}))