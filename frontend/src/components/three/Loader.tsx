import { Html, useProgress } from "@react-three/drei";
import React from "react";

type LoaderProps = {};

const Loader = (props: LoaderProps): JSX.Element => {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % loaded</Html>;
};

export default Loader;
