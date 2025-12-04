import React, { createContext, useContext } from "react";
import useScene from "../canvas-utils/scene-manager-hook";
import useCamera from "../canvas-utils/camera-manager-hook";
import useRenderer from "../canvas-utils/renderer-manager-hook";
import type { CanvasContextValue, CanvasProviderProps } from "./dto/CanvasProvider";

const CanvasContext = createContext<CanvasContextValue|null>(null);

export const CanvasProvider = ({ children }:CanvasProviderProps) => {
    const scene = useScene();
    const camera = useCamera({ fov: 75 });
    const renderer = useRenderer();

    return (
        <CanvasContext.Provider value={{ scene, camera, renderer }}>
            {children}
        </CanvasContext.Provider>
    );
};

export const useCanvasContext = () => {
  const ctx = useContext(CanvasContext);
  if (!ctx) throw new Error("CanvasContext used outside provider");
  return ctx;
};
