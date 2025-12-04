import React from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const useGLTFLoader = () => {
    const loader = React.useMemo(() => new GLTFLoader(), []);
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderConfig({ type: 'js' });
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(dracoLoader);

    const loadModel = React.useCallback(async (url: string) => {
        return await loader.loadAsync(url);
    }, [loader]);

    return loadModel;
};

export default useGLTFLoader;
