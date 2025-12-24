import { Vector3 } from "three";
import Canvas from "./threejs/canvas/Canvas"
import AmbientLight from "./threejs/lights/Ambient-Light";
import Toolbar from "./app/toolbar/toolbar";
import ClippingTool from "./app/toolbar/clipping/clipping";
import { useToolbarStore } from "./app/toolbar/store/toolbar-store";
import UtilityPanel from "./app/toolbar/quick-helper/quick-helper";
import PlaneGeometry from "./app/studio/plane/plane-geom";
import { useRayCasterController } from "./app/studio/raycaster/raycaster-hook";
import OrbitControls from "./threejs/controls/orbit-controls";
import useFirstPersonMovement from "./app/studio/camera-view/first-person";

//threejs 3d enviorment studio
// add a plane as default with x,y,z size that can be dyanmic
// add a panel where object can be load and positioned dyanmically add a object controller rotater and scaler
// try to create a enviorment around it 
// attach a player charecterizations
const App = () => {
  const { showQuickOptions } = useToolbarStore()
  useRayCasterController()
  useFirstPersonMovement()
  return (
    <div>
      {showQuickOptions && <UtilityPanel />}
      <Toolbar />
      <Canvas background="black">
        <OrbitControls />
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
