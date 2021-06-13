import {
  OrbitControls,
  OrbitControlsProps,
  PointerLockControls,
  PointerLockControlsProps,
} from "@react-three/drei";
import { OrbitControls as OrbitControlsType } from "three-stdlib";
import { extend, useFrame, useThree } from "@react-three/fiber";
import React, { forwardRef, useEffect } from "react";
import { useRef } from "react";
import * as THREE from "three";
import useForwardedRef from "../../hooks/useForwardedRef";
import useGlobal from "../../store";

export const MobileControls = forwardRef<OrbitControlsType, OrbitControlsProps>(
  (props, ref): JSX.Element => {
    const controls = useForwardedRef<OrbitControlsType>(ref);
    const [isMoving, setIsMoving] = useGlobal(
      state => state.isMoving,
      actions => actions.setIsMoving
    );
    const onTouchStart = (e: TouchEvent) => {
      if (controls.current && !isMoving) {
        setIsMoving(true);
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (controls.current) {
        setIsMoving(false);
      }
    };

    useEffect(() => {
      document.addEventListener("touchstart", onTouchStart);
      document.addEventListener("touchend", onTouchEnd);

      return () => {};
    });

    return <OrbitControls {...props} ref={controls} />;
  }
);

const Controls = forwardRef<PointerLockControls, PointerLockControlsProps>(
  (props, ref): JSX.Element => {
    const { camera } = useThree();
    const controls = useForwardedRef<PointerLockControls>(ref);

    return <PointerLockControls {...props} ref={controls} camera={camera} />;
  }
);

export default Controls;
