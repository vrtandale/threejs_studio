import { Vector3 } from "three";
import Canvas from "./threejs/canvas/Canvas"
import OrbitControls from "./threejs/controls/orbit-controls";
import BoxGeometry from "./threejs/geometry/BoxGeometry";
import AmbientLight from "./threejs/lights/Ambient-Light";
import useGLTFLoader from "./threejs/object-loaders/gltf-glb-hook";
import { useCanvasContext } from "./threejs/canvas-utils/canvas-provider";
import React from "react";
import Toolbar from "./components/toolbar";
const App = () => {
  const loader = useGLTFLoader();
  const { scene } = useCanvasContext()
  React.useEffect(() => {
    loader("/ferrari.glb").then((gltf) => {
      scene.add(gltf.scene);
    })
  }, [])
  return (
    <div>
      <Toolbar/>
      <Canvas background="white">
        {/* <BoxGeometry /> */}
        <OrbitControls position={new Vector3(10, 10, 10)} />
        <AmbientLight />
      </Canvas>

    </div>
  )
}

export default App
