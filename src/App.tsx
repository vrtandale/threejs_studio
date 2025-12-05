import { Vector3 } from "three";
import Canvas from "./threejs/canvas/Canvas"
import OrbitControls from "./threejs/controls/orbit-controls";
import AmbientLight from "./threejs/lights/Ambient-Light";

import Toolbar from "./app/toolbar";
const App = () => {
 
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
