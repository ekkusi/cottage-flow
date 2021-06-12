import { Html, useProgress } from "@react-three/drei";
import React from "react";
import { useEffect } from "react";
import useGlobal from "../../store";

type LoaderProps = {};

const Loader = (props: LoaderProps): JSX.Element => {
  const { active, progress, errors, item, loaded, total } = useProgress();

  return <Html center>{progress.toFixed(2)}% ladattu</Html>;
};

export default Loader;
