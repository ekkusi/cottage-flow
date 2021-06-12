import { Html, useProgress } from "@react-three/drei";
import React from "react";
import { useEffect } from "react";
import useGlobal from "../../store";

type LoaderProps = {};

const Loader = (props: LoaderProps): JSX.Element => {
  const { active, progress, errors, item, loaded, total } = useProgress();
  const [isLoadingAssets, setIsLoadingAssets] = useGlobal(
    state => state.isLoadingAssets,
    actions => actions.setIsLoadingAssets
  );

  useEffect(() => {
    if (!isLoadingAssets && active) {
      setIsLoadingAssets(true);
    } else if (isLoadingAssets && !active) {
      setIsLoadingAssets(false);
    }
  });
  return <Html center>{progress} % loaded</Html>;
};

export default Loader;
