  import { Button } from '@/components/ui/button'
  import React from 'react'
  import useGeometry from './use-geometries-hooks'
  import { useCanvasContext } from '@/threejs/canvas-utils/canvas-provider'

  const MeshGeomtriesUi = () => {
      const addGeom = useGeometry()
    
    
      
    return (
      <>
      <div><Button onClick={()=>console.log(addGeom('cube')())}>Cube</Button></div>
      <div><Button onClick={()=>console.log(addGeom('sphere')())}>Sphere</Button></div>
      <div><Button onClick={()=>console.log(addGeom('pointLight')())}>Point Light</Button></div>
    </>
    )
  }

  export default MeshGeomtriesUi