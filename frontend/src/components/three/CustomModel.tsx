import { useGLTF } from "@react-three/drei";
import React from "react";

type CustomModelProps = {
  assetPath: string;
};

const CustomModel = ({ assetPath }: CustomModelProps): JSX.Element => {
  const gltf = useGLTF(assetPath, true);
  return <primitive object={gltf.scene.clone(true)} />;
};

export default CustomModel;
