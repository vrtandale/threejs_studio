import { Vector3 } from "three";
import Canvas from "./threejs/canvas/Canvas"
import UtilityPanel from "./app/components/quick-helper/quick-helper";
import PlaneGeometry from "./app/studio/plane/plane-geom";
import { useRayCasterController } from "./app/studio/controllers/use-raycast-controller";
import OrbitControls from "./threejs/controls/orbit-controls";
import useFirstPersonMovement from "./app/studio/camera-view/first-person";
import Sidebar from "./app/components/sidebar";
import useLights from "./app/studio/lights-studio/ambient-light";
import ColliderGpuV2 from "./app/components/quick-helper/collission/collider-gpu-2";

//threejs 3d enviorment studio
// add a plane as default with x,y,z size that can be dyanmic
// add a panel where object can be load and positioned dyanmically add a object controller rotater and scaler
// try to create a enviorment around it 
// attach a player charecterizations
const App = () => {
  useRayCasterController({})
  useFirstPersonMovement()
  useLights()
  return (
    <div>
      <Sidebar/>
      <UtilityPanel/>
      {/* <ScaleDistance/> */}
        <Canvas >
          {/* <Grass/> */}
        <OrbitControls />
        {/* <PlaneGeometry/> */}
        {/* <BoxGeometry color="cyan" pos={new Vector3(2,2,2)}/> */}
        {/* <SeaShade/> */}
        {/* <CustomClipping/> */}
        {/* <ColliderObject/> */}
        {/* <ClippingTool/> */}
        <ColliderGpuV2/>
        {/* <ColliderGpuV2/> */}
        {/* <ShaderWaterSea/> */}

      </Canvas>

    </div>
  )
}

export default App
