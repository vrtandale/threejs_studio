import { Vector3 } from "three";
import Canvas from "./threejs/canvas/Canvas"
import AmbientLight from "./threejs/lights/Ambient-Light";
import UtilityPanel from "./app/components/quick-helper/quick-helper";
import PlaneGeometry from "./app/studio/plane/plane-geom";
import { useRayCasterController } from "./app/studio/raycaster/raycaster-hook";
import OrbitControls from "./threejs/controls/orbit-controls";
import useFirstPersonMovement from "./app/studio/camera-view/first-person";
import Sidebar from "./app/components/sidebar";

//threejs 3d enviorment studio
// add a plane as default with x,y,z size that can be dyanmic
// add a panel where object can be load and positioned dyanmically add a object controller rotater and scaler
// try to create a enviorment around it 
// attach a player charecterizations
const App = () => {
  useRayCasterController()
  useFirstPersonMovement()
  return (
    <div>
      <Sidebar/>
      <UtilityPanel/>
      <Canvas background="black">
        <OrbitControls />
        <AmbientLight />
        <PlaneGeometry/>
        {/* <BoxGeometry color="cyan" pos={new Vector3(2,2,2)}/> */}
        {/* <SeaShade/> */}
        {/* <CustomClipping/> */}
        {/* <ColliderObject/> */}
      </Canvas>

    </div>
  )
}

export default App
