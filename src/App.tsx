import { Vector3 } from "three";
import Canvas from "./threejs/canvas/Canvas"
import OrbitControls from "./threejs/controls/orbit-controls";
import AmbientLight from "./threejs/lights/Ambient-Light";

import Toolbar from "./app/toolbar/toolbar";
import ClippingTool from "./app/toolbar/clipping/clipping";
import ClippingHelper from "./app/toolbar/clipping/clipping-helper";
const App = () => {
 
  return (
    <div>
      <ClippingHelper/>
      <Toolbar/>
      <Canvas background="white">
        {/* <BoxGeometry /> */}
        <OrbitControls position={new Vector3(10, 10, 10)} />
        <AmbientLight />
        <ClippingTool/>
      </Canvas>

    </div>
  )
}

export default App
