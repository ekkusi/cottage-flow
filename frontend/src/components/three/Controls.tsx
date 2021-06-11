import {
  PointerLockControls,
  PointerLockControlsProps,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { forwardRef } from "react";

const Controls = forwardRef<PointerLockControls, PointerLockControlsProps>(
  (props, ref): JSX.Element => {
    const three = useThree();

    return <PointerLockControls {...props} ref={ref} camera={three.camera} />;
  }
);

export default Controls;
