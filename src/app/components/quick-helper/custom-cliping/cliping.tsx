import * as THREE from 'three'
import { useCanvasContext } from '../../../../threejs/canvas-utils/canvas-provider';
import React from 'react';
import { useClippingStore } from '../clipping/clipping-store';

const CustomClipping = () => {
    const { scene, renderer } = useCanvasContext()
    const { clipingOrientation,clippingPosition } = useClippingStore()
    const planeNormal = React.useMemo(() => new THREE.Vector3(1, 0, 0), []);
    const planePoint  = React.useMemo(() => new THREE.Vector3(0, 0, 0), []);

    React.useEffect(() => {
        planeNormal.set(clipingOrientation.x,clipingOrientation.y,clipingOrientation.z);
        planePoint.copy(planeNormal).multiplyScalar(clippingPosition)
        planeNormal.normalize();
    }, [clipingOrientation,clippingPosition]);

    React.useEffect(() => {
        renderer.localClippingEnabled = true;

        scene.traverse((obj:any) => {
            if (!obj.isMesh) return;

            const material = obj.material;
            if (!material) return;

            // Store original shader
            if (!material.userData._patched) {
                material.onBeforeCompile = (shader:any) => {

                    shader.uniforms.planeNormal = { value: planeNormal };
                    shader.uniforms.planePoint  = { value: planePoint };

                    // Inject into vertex shader
                    shader.vertexShader = shader.vertexShader.replace(
                        "void main() {",
                        `
                        varying vec3 vWorldPos;
                        void main() {
                            vec4 worldPos = modelMatrix * vec4(position, 1.0);
                            vWorldPos = worldPos.xyz;
                        `
                    );

                    // Inject into fragment shader
                    shader.fragmentShader = shader.fragmentShader.replace(
                        "void main() {",
                        `
                        varying vec3 vWorldPos;
                        uniform vec3 planeNormal;
                        uniform vec3 planePoint;

                        void main() {
                            float d = dot(planeNormal, vWorldPos - planePoint);
                            if (d < 0.0) discard;
                        `
                    );

                    material.userData.shader = shader;
                };

                material.userData._patched = true;
                material.needsUpdate = true;
            }
        });

    }, [scene, planeNormal, planePoint,clipingOrientation]);


    return null;
};

export default CustomClipping;
