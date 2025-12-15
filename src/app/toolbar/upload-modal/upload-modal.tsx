import React, { useRef, useState } from "react";
import './uploadmodal.css'
import useGLTFLoader from "../../../threejs/object-loaders/gltf-glb-hook";
import { useCanvasContext } from "../../../threejs/canvas-utils/canvas-provider";
import * as THREE from 'three'
import { useModalStore } from "./upload-modal-store";
const UploadModal = () => {
    const fileRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string>("");
    const [fileUrl, setFileUrl] = useState<string>("");
    const loader = useGLTFLoader();
    const { scene } = useCanvasContext()
    const {setObject3d}=useModalStore()
    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
    };

    const handleUpload = () => {
        const file = fileRef.current?.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        setFileUrl(url);
        loader(url).then((gltf) => {
            scene.add(gltf.scene);
            setObject3d(gltf.scene)
        })
        console.log("Blob URL:", url);
    };

  
    return (
        <div className="upload-modal">
            <h2 className="upload-title">Upload File</h2>

            <input
                type="file"
                ref={fileRef}
                onChange={handleSelect}
                className="upload-input-hidden"
            />

            <div
                className="upload-dropzone"
                onClick={() => fileRef.current?.click()}
            >
                {fileName ? (
                    <p className="file-name">{fileName}</p>
                ) : (
                    <>
                        <p>Drag & drop your file here</p>
                        <span>or click to browse</span>
                    </>
                )}
            </div>

            <button className="upload-btn" onClick={handleUpload}>Generate URL</button>

            {fileUrl && (
                <div className="file-url-preview">
                    <p>Blob URL:</p>
                    <code>{fileUrl}</code>
                </div>
            )}
        </div>
    );
};

export default UploadModal;
