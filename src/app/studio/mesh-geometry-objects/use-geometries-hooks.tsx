import React from "react"
import useCube from "./cube"
import useSphere from "./sphere"

const useGeometry = () => {
  const addCube = useCube()
  const addSphere = useSphere()
  return React.useCallback((type: string) => {
    switch (type) {
      case 'cube':
        return addCube
      case 'sphere':
        return addSphere
      default:
        return () => {}
    }
  }, [addCube])
}

export default useGeometry
