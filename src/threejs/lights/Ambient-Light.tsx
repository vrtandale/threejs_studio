import * as THREE from "three";
import { useCanvasContext } from "../canvas-utils/canvas-provider";
const AmbientLight = () => {
    const {scene}=useCanvasContext()
    const light = new THREE.AmbientLight( 0x404040,30 ); // soft white light
    scene.add( light );
  return (
    <></>
  )
}

export default AmbientLight