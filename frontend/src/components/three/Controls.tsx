import {
  PointerLockControls,
  PointerLockControlsProps,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { forwardRef, useEffect } from "react";
import useForwardedRef from "../../hooks/useForwardedRef";
import useGlobal from "../../store";

const Controls = forwardRef<PointerLockControls, PointerLockControlsProps>(
  (props, ref): JSX.Element => {
    const three = useThree();
    const controls = useForwardedRef<PointerLockControls>(ref);
    const [isMoving, setIsMoving] = useGlobal(
      state => state.isMoving,
      actions => actions.setIsMoving
    );

    const onTouchStart = (e: TouchEvent) => {
      console.log("Touch start");
      if (controls.current) {
        setIsMoving(true);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      console.log("Touch move");
      if (controls.current) {
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      console.log("Touch end");
      if (controls.current) {
        setIsMoving(false);
      }
    };

    useEffect(() => {
      document.addEventListener("touchstart", onTouchStart);
      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("touchend", onTouchEnd);

      return () => {};
    });

    return (
      <PointerLockControls {...props} ref={controls} camera={three.camera} />
    );
  }
);

export default Controls;
