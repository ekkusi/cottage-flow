import React from "react";
import * as THREE from "three";
import { TTFLoader } from "three/examples/jsm/loaders/TTFLoader";

type UseFontProps = {
  url: string;
};

const UseFont = async ({ url }: UseFontProps): Promise<THREE.Font> => {
  if (window) {
    const ttfLoader = new TTFLoader();
    const fontLoader = new THREE.FontLoader();

    const ttfFont = await ttfLoader.loadAsync(url);

    return fontLoader.parse(ttfFont);
  }
  throw new Error("Window is undefined");
};

export default UseFont;
