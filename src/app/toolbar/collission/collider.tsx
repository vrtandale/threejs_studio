import React from "react"
import { useCanvasContext } from "../../../threejs/canvas-utils/canvas-provider"
import BoxGeometry from "../../../threejs/geometry/BoxGeometry"
import { Mesh, Object3D } from "three"

const ColliderObject = () => {
    const {}=useCanvasContext()
    const refBox=React.useRef<Object3D>(null)
    React.useEffect(()=>{
        refBox.current
    },[refBox])
  return (
    <><BoxGeometry ref={refBox}/></>
  )
}

export default ColliderObject