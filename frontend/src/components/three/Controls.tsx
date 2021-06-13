import {
  OrbitControls as OrbitControlsImpl,
  OrbitControlsProps,
  PointerLockControls as PointerLockControlsImpl,
  PointerLockControlsProps,
  useProgress,
} from "@react-three/drei";
import { OrbitControls as OrbitControlsType } from "three-stdlib";
import { extend, useFrame, useThree } from "@react-three/fiber";
import React, { forwardRef, useEffect } from "react";
import { useRef } from "react";
import * as THREE from "three";
import useForwardedRef from "../../hooks/useForwardedRef";
import useGlobal from "../../store";

export const OrbitControls = forwardRef<OrbitControlsType, OrbitControlsProps>(
  (props, ref): JSX.Element => {
    const controls = useForwardedRef<OrbitControlsType>(ref);
    const [isMoving, setIsMoving] = useGlobal(
      state => state.isMoving,
      actions => actions.setIsMoving
    );
    const isNavigatingIn = useGlobal(state => state.isNavigatingIn)[0];

    const { active } = useProgress();
    const onStart = () => {
      if (controls.current && !isMoving) {
        setIsMoving(true);
      }
    };

    useEffect(() => {
      if (!active && !isNavigatingIn) {
        document.addEventListener("touchstart", onStart);
        document.addEventListener("click", onStart);
      }

      return () => {
        document.removeEventListener("touchstart", onStart);
        document.removeEventListener("click", onStart);
      };
    });

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
