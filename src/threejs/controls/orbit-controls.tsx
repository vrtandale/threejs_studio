import { OrbitControls as ThreeOrbitControls } from 'three/addons/controls/OrbitControls.js';
import { useCanvasContext } from '../canvas-utils/canvas-provider';
import type { Vector3 } from 'three';
const OrbitControls = ({ position }: { position: Vector3 }) => {
    const { camera, renderer } = useCanvasContext();
    const controls = new ThreeOrbitControls(camera, renderer.domElement);
    camera.position.set(position.x, position.y, position.z);
    controls.enableRotate=false
    controls.update();
    return (<></>);
}

export default OrbitControls