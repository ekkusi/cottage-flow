import {
  OrbitControls as OrbitControlsImpl,
  OrbitControlsProps,
  PointerLockControls as PointerLockControlsImpl,
  PointerLockControlsProps,
  useProgress,
} from "@react-three/drei";
import { OrbitControls as OrbitControlsType } from "three-stdlib";
import { useThree } from "@react-three/fiber";
import React, { forwardRef } from "react";
import useForwardedRef from "../../hooks/useForwardedRef";

export const OrbitControls = forwardRef<OrbitControlsType, OrbitControlsProps>(
  (props, ref): JSX.Element => {
    const controls = useForwardedRef<OrbitControlsType>(ref);

    return <OrbitControlsImpl {...props} ref={controls} />;
  }
);

export const PointerLockControls = forwardRef<
  PointerLockControlsImpl,
  PointerLockControlsProps
>(
  (props, ref): JSX.Element => {
    const { camera } = useThree();
    const controls = useForwardedRef<PointerLockControlsImpl>(ref);

    return (
      <PointerLockControlsImpl {...props} ref={controls} camera={camera} />
    );
  }
);
