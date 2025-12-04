import type { Object3DEventMap, PerspectiveCamera, Scene, WebGLRenderer } from "three";

export interface CanvasProviderProps {
    children: React.ReactNode;
}

export interface CanvasContextValue {
    scene: Scene<Object3DEventMap>;
    camera: PerspectiveCamera;
    renderer: WebGLRenderer;
}