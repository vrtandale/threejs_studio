import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useModalStore } from './upload-modal-store';
import { useCanvasContext } from '../../../threejs/canvas-utils/canvas-provider';

type MeshItem = {
  id: string;
  name: string;
  mesh: THREE.Mesh;
  material: THREE.MeshStandardMaterial;
};

const ModalEditor = () => {
  const { object3d } = useModalStore();
    const {camera,renderer,scene}=useCanvasContext()
  const [meshes, setMeshes] = useState<MeshItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [color, setColor] = useState('#ffffff');

  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  /* ----------------------------------------
   * 1️⃣ Collect meshes for UI
   * --------------------------------------*/
  useEffect(() => {
    if (!object3d) return;

    const list: MeshItem[] = [];

    object3d.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.MeshStandardMaterial;

        if (material?.isMeshStandardMaterial) {
          list.push({
            id: mesh.uuid,
            name: mesh.name || mesh.uuid.slice(0, 8),
            mesh,
            material,
          });
        }
      }
    });

    setMeshes(list);
  }, [object3d]);

  /* ----------------------------------------
   * 2️⃣ Mouse click → Raycast → Select mesh
   * --------------------------------------*/
  useEffect(() => {
    if (!renderer || !camera || !scene) return console.log('returned');

    const handleClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();

      mouse.current.x =
        ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y =
        -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);

      const intersects = raycaster.current.intersectObjects(
        meshes.map((m) => m.mesh),
        true
      );

      if (intersects.length > 0) {
        const mesh = intersects[0].object as THREE.Mesh;
        console.log(mesh)
        setSelectedId(mesh.uuid);

        const mat = mesh.material as THREE.MeshStandardMaterial;
        setColor(`#${mat.color.getHexString()}`);
      }
    };

    renderer.domElement.addEventListener('pointerdown', handleClick);

    return () => {
      renderer.domElement.removeEventListener('pointerdown', handleClick);
    };
  }, [renderer, camera, scene, meshes]);

  /* ----------------------------------------
   * 3️⃣ Apply color to selected mesh
   * --------------------------------------*/
  useEffect(() => {
    if (!selectedId) return;

    const selected = meshes.find((m) => m.id === selectedId);
    if (!selected) return;

    selected.material.color.set(color);
    selected.material.needsUpdate = true;
  }, [color, selectedId, meshes]);

  return (
    <div style={{ padding: 12 }}>
      <h3>Model Parts</h3>

    <select>
        {meshes.map((m) => (
          <option
            key={m.id}
            style={{
              cursor: 'pointer',
              fontWeight: selectedId === m.id ? 'bold' : 'normal',
            }}
            onClick={() => {
              setSelectedId(m.id);
              setColor(`#${m.material.color.getHexString()}`);
            }}
          >
            {m.name}
          </option>
        ))}
</select>
      {/* Color Picker */}
      <input
        type="color"
        disabled={!selectedId}
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  );
};

export default ModalEditor;
