// Canvas.tsx
import useCanvas from "./Canvas-hook";
import type { CanvasType } from "./canvas-type";

const Canvas = ({children,background}:CanvasType) => {
    
    const {mountRef}=useCanvas({background});
    return (
        <div
            className="mycanvas"
            ref={mountRef}
        >
            {children}
        </div>
    );
};



export default Canvas;
