import { Vector3 } from 'three'
import { useClippingStore } from './clipping-store'
import React from 'react'

const ClippingHelper = () => {
    const { setClippingPosition, setClippingOrientation } = useClippingStore();
    const [axis, setAxis] = React.useState<Axis>("X");

    const rotateAxis = () => {
        const next = getNextAxis(axis);
        setAxis(next);
        setClippingOrientation(axisToVector(next));
    };

    return (
        <div>
            <div className="utility-section">
                <div className="section-title">✂️ Clipping Position</div>

                <input
                    type="range"
                    min={0}
                    max={100}
                    onChange={(e) => setClippingPosition(Number(e.target.value))}
                    className="slider"
                />
                Rotate Axis
                <button className='btn' onClick={rotateAxis}>
                    (Current: {axis})
                </button>
            </div>
        </div>
    );
};


export default ClippingHelper



export const AXES = ["X", "Y", "Z"] as const;
export type Axis = typeof AXES[number];

export const axisToVector = (axis: Axis) => {
    switch (axis) {
        case "X": return new Vector3(1, 0, 0);
        case "Y": return new Vector3(0, 1, 0);
        case "Z": return new Vector3(0, 0, 1);
    }
};

export const getNextAxis = (axis: Axis): Axis => {
    const index = AXES.indexOf(axis);
    return AXES[(index + 1) % AXES.length];
};
