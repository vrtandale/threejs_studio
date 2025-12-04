import { Vector3 } from "three";
import Canvas from "./threejs/canvas/Canvas"
import OrbitControls from "./threejs/controls/orbit-controls";
import BoxGeometry from "./threejs/geometry/BoxGeometry";
import AmbientLight from "./threejs/lights/Ambient-Light";
const App = () => {
  // const loader = useGLTFLoader();
  // const { scene } = useCanvasContext()
  // React.useEffect(() => {
  //   loader("/ferrari.glb").then((gltf) => {
  //     scene.add(gltf.scene);
  //   })
  // }, [])
  return (
    <div>
      <Canvas background="white">
        <BoxGeometry />
        {/* <SphereGeometry/> */}
        <OrbitControls position={new Vector3(10, 10, 10)} />
        <AmbientLight />
      </Canvas>

    </div>
  )
}

export default App
