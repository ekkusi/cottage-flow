import {
  PointerLockControls,
  PointerLockControlsProps,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { forwardRef, useEffect } from "react";
import useForwardedRef from "../../hooks/useForwardedRef";

const Controls = forwardRef<PointerLockControls, PointerLockControlsProps>(
  (props, ref): JSX.Element => {
    const three = useThree();
    const controls = useForwardedRef<PointerLockControls>(ref);

    const onTouchStart = (e: TouchEvent) => {
      console.log("Touch start")
    }
    
    const onTouchMove = (e: TouchEvent) => {
      console.log("Touch move")
    }

    const onTouchEnd = (e: TouchEvent) => {
      console.log("Touch end")
    }

    useEffect(() => {
      document.addEventListener("touchstart", onTouchStart);
      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("touchend", onTouchEnd);

      return () => {

      }  
    })

    return <PointerLockControls {...props} ref={controls} camera={three.camera} />;
  }
);

export default Controls;
