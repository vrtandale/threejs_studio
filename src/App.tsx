import { Vector3 } from "three";
import Canvas from "./threejs/canvas/Canvas"
import OrbitControls from "./threejs/controls/orbit-controls";
import AmbientLight from "./threejs/lights/Ambient-Light";

import Toolbar from "./app/toolbar/toolbar";
import ClippingTool from "./app/toolbar/clipping/clipping";
import ClippingHelper from "./app/toolbar/clipping/clipping-helper";
import { useToolbarStore } from "./app/toolbar/toolbar-store";
const App = () => {
  const { setQuickOptions, showQuickOptions } = useToolbarStore()

  return (
    <div>
      {showQuickOptions && <ClippingHelper />}
      <Toolbar />
      <Canvas background="white">
        {/* <BoxGeometry /> */}
        <OrbitControls position={new Vector3(10, 10, 10)} />
        <AmbientLight />
        {showQuickOptions && <ClippingTool />}

      </Canvas>

    </div>
  )
}

export default App
