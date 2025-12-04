import { Vector3 } from "three";
import Canvas from "./threejs/canvas/Canvas"
import OrbitControls from "./threejs/controls/orbit-controls";
import BoxGeometry from "./threejs/geometry/BoxGeometry";
const App = () => {
  return (
    <div>
      <Canvas background="white">
        <BoxGeometry />
        <OrbitControls position={new Vector3(10,10,10)}/>
      </Canvas>

    </div>
  )
}

export default App
