import { Vector3 } from "three";
import Canvas from "./threejs/canvas/Canvas"
import OrbitControls from "./threejs/controls/orbit-controls";
import AmbientLight from "./threejs/lights/Ambient-Light";

import Toolbar from "./app/toolbar/toolbar";
import ClippingTool from "./app/toolbar/clipping/clipping";
import { useToolbarStore } from "./app/toolbar/toolbar-store";
import UtilityPanel from "./app/toolbar/quick-helper/quick-helper";
import SeaShade from "./app/toolbar/shader/shader";
import ColliderObject from "./app/toolbar/collission/collider";
const App = () => {
  const { showQuickOptions } = useToolbarStore()

  return (
    <div>
      {showQuickOptions && <UtilityPanel />}
      <Toolbar />
      <Canvas background="white">
        <OrbitControls position={new Vector3(10, 10, 10)} />
        <AmbientLight />
        {/* <SeaShade/> */}
        {/* <CustomClipping/> */}
        {<ColliderObject/>}
        {showQuickOptions && <ClippingTool />}
      </Canvas>

    </div>
  )
}

export default App
