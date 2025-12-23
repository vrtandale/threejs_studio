import { Vector3 } from "three";
import Canvas from "./threejs/canvas/Canvas"
import OrbitControls from "./threejs/controls/orbit-controls";
import AmbientLight from "./threejs/lights/Ambient-Light";
import Toolbar from "./app/toolbar/toolbar";
import ClippingTool from "./app/toolbar/clipping/clipping";
import { useToolbarStore } from "./app/toolbar/toolbar-store";
import UtilityPanel from "./app/toolbar/quick-helper/quick-helper";
import ColliderObject from "./app/toolbar/collission/collider";
import SeaShade from "./app/toolbar/shader/shader";
import PlaneGeometry from "./app/studio/plane/plane-geom";

//threejs 3d enviorment studio
// add a plane as default with x,y,z size that can be dyanmic
// add a panel where object can be load and positioned dyanmically add a object controller rotater and scaler
// try to create a enviorment around it 
// attach a player charecterizations
const App = () => {
  const { showQuickOptions } = useToolbarStore()

  return (
    <div>
      {showQuickOptions && <UtilityPanel />}
      <Toolbar />
      <Canvas background="black">
        <OrbitControls position={new Vector3(10, 10, 10)} />
        <AmbientLight />
        <PlaneGeometry/>
        {/* <BoxGeometry color="cyan" pos={new Vector3(2,2,2)}/> */}
        {/* <SeaShade/> */}
        {/* <CustomClipping/> */}
        {/* <ColliderObject/> */}
        {showQuickOptions && <ClippingTool />}
      </Canvas>

    </div>
  )
}

export default App
