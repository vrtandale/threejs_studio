import { useClippingStore } from './clipping-store'

const ClippingHelper = () => {
  const  {setClippingPosition}= useClippingStore()
  return (
    <div style={{ position: "absolute", display: 'flex' }}>
      Cliping Position
      <input
        type="range"
        min={0}
        max={100}
        onChange={(e) => setClippingPosition(Number(e.target.value))}
      />
    </div>
  )
}

export default ClippingHelper