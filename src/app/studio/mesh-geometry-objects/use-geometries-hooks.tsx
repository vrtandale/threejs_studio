import React from "react"
import useCube from "./cube"
import useSphere from "./sphere"
import usePointLight from "../lights-studio/ambient-light"

const useGeometry = () => {
  const addCube = useCube()
  const addSphere = useSphere()
  const addPointLight = usePointLight()
  return React.useCallback((type: string) => {
    switch (type) {
      case 'cube':
        return addCube
      case 'sphere':
        return addSphere
      case 'pointLight':
        return addPointLight
      default:
        return () => {}
    }
  }, [addCube])
}

export default useGeometry
