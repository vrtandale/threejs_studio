import * as THREE from 'three'
import { useCanvasContext } from '../../../threejs/canvas-utils/canvas-provider';
import React from 'react';
import { useClippingStore } from '../clipping/clipping-store';

const CustomClipping = () => {
    const { scene, renderer } = useCanvasContext()
    const { clipingOrientation,clippingPosition } = useClippingStore()

    const planeNormal = React.useMemo(() => new THREE.Vector3(1, 0, 0), []);
    const planePoint  = React.useMemo(() => new THREE.Vector3(0, 0, 0), []);

    // 🔄 Update plane based on UI switch
    React.useEffect(() => {
        planeNormal.set(clipingOrientation.x,clipingOrientation.y,clipingOrientation.z);
        planePoint.copy(planeNormal).multiplyScalar(clippingPosition)
        planeNormal.normalize();
    }, [clipingOrientation,clippingPosition]);

    // === APPLY CLIPPING TO ALL EXISTING MATERIALS ===
    React.useEffect(() => {
        renderer.localClippingEnabled = true;

        scene.traverse(obj => {
            if (!obj.isMesh) return;

            const material = obj.material;
            if (!material) return;

            // Store original shader
            if (!material.userData._patched) {
                material.onBeforeCompile = (shader) => {

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



    // Plane Visualizer
    React.useEffect(() => {
        const helper = new THREE.Mesh(
            new THREE.PlaneGeometry(4, 4),
            new THREE.MeshBasicMaterial({ color: 0x00aaff, transparent: true, opacity: 0.2 })
        );

        helper.rotation.y = Math.PI / 2;
        scene.add(helper);

        return () => scene.remove(helper);
    }, [scene,clipingOrientation]);

    return null;
};

export default CustomClipping;
