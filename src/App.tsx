import { Vector3 } from "three";
import Canvas from "./threejs/canvas/Canvas"
import UtilityPanel from "./app/components/quick-helper/quick-helper";
import PlaneGeometry from "./app/studio/plane/plane-geom";
import { useRayCasterController } from "./app/studio/controllers/use-raycast-controller";
import OrbitControls from "./threejs/controls/orbit-controls";
import useFirstPersonMovement from "./app/studio/camera-view/first-person";
import Sidebar from "./app/components/sidebar";
import useLights from "./app/studio/lights-studio/ambient-light";
import EnviromentManager from "./app/studio/enviroment/enviroment";
import Sin from "./app/studio/maths/sin";
import ScaleDistance from "./app/studio/maths/scale";
import ShaderWaterSea from "./app/studio/maths/shade";
import SeaShade from "./app/components/quick-helper/shader/shader";
import Grass from "./app/studio/maths/grass";
import ColliderObject from "./app/components/quick-helper/collission/collider";
import CustomClipping from "./app/components/quick-helper/custom-cliping/cliping";
import ClippingTool from "./app/components/quick-helper/clipping/clipping";
import ColliderGpu from "./app/components/quick-helper/collission/collider-gpu";

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
        <ColliderGpu/>
        {/* <ShaderWaterSea/> */}

      </Canvas>

    </div>
  )
}

export default App
