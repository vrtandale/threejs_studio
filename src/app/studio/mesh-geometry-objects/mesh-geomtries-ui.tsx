import { Button } from '@/components/ui/button'
import React from 'react'
import useGeometry from './use-geometries-hooks'
import { useCanvasContext } from '@/threejs/canvas-utils/canvas-provider'

const MeshGeomtriesUi = () => {
    const addGeom = useGeometry()
    console.log(addGeom)
   
    
  return (
    <div><Button onClick={()=>console.log(addGeom('cube')())}>Cube</Button></div>
  )
}

export default MeshGeomtriesUi