import React from "react"
import useCube from "./cube"

const useGeometry = () => {
  const addCube = useCube()

  return React.useCallback((type: string) => {
    switch (type) {
      case 'cube':
        return addCube
      default:
        return () => {}
    }
  }, [addCube])
}

export default useGeometry
