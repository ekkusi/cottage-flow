import {
  DeviceOrientationControls,
  PointerLockControls,
  PointerLockControlsProps,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { forwardRef, useEffect } from "react";
import * as THREE from "three";
import useForwardedRef from "../../hooks/useForwardedRef";
import useGlobal from "../../store";

export const MobileControls = forwardRef<DeviceOrientationControls>(
  (props, ref): JSX.Element => {
    const { camera } = useThree();
    const controls = useForwardedRef<DeviceOrientationControls>(ref);
    const [isMoving, setIsMoving] = useGlobal(
      state => state.isMoving,
      actions => actions.setIsMoving
    );
    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.cancelBubble = true;
      e.returnValue = false;
      if (controls.current) {
        controls.current.enabled = true;
        setIsMoving(true);
      }
    };

    let lastTouchEndCameraRotation: THREE.Euler = new THREE.Euler().setFromQuaternion(
      camera.quaternion
    );

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.cancelBubble = true;
      e.returnValue = false;
    };

    const onTouchEnd = (e: TouchEvent) => {
      console.log("Touch end");
      // if (controls.current) {
      //   controls.current.enabled = false;
      //   setIsMoving(false);
      // }
    };
    useFrame(() => {
      if (controls.current && controls.current.update) {
        controls.current.update();
      }
    });
    useEffect(() => {
      document.addEventListener("touchstart", onTouchStart);
      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("touchend", onTouchEnd);
      document.addEventListener("contextmenu", e => {
        e.preventDefault();
      });

      return () => {};
    });

    console.log("Rendering deviceorienatation controls");
    return (
      <DeviceOrientationControls {...props} ref={controls} camera={camera} />
    );
  }
);

const Controls = forwardRef<PointerLockControls, PointerLockControlsProps>(
  (props, ref): JSX.Element => {
    const { camera } = useThree();
    const controls = useForwardedRef<PointerLockControls>(ref);
    const [isMoving, setIsMoving] = useGlobal(
      state => state.isMoving,
      actions => actions.setIsMoving
    );

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.cancelBubble = true;
      e.returnValue = false;
      console.log("Touch start");
      if (controls.current) {
        setIsMoving(true);
      }
    };

    let lastTouchEndCameraRotation: THREE.Euler = new THREE.Euler().setFromQuaternion(
      camera.quaternion
    );

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.cancelBubble = true;
      e.returnValue = false;
      var PI_2 = Math.PI / 2;
      var PI_2y = Math.PI / 3.8;
      var PI_2_mobile = Math.PI / 9;
      var ww = document.body.clientWidth / 2;
      var wh = document.body.clientHeight / 0.2;
      var h = window.innerHeight;
      console.log("Touch move");
      const euler = new THREE.Euler(0, 0, 0, "XYZ");
      const clientY = e.touches[0].clientY;
      const clientX = e.touches[0].clientX;
      const xfromtouch = clientX - ww;
      const yfromtouch = clientY - (h - 100);
      euler.setFromQuaternion(camera.quaternion);
      euler.y = xfromtouch * 0.005;
      euler.x = yfromtouch * 0.005;
      // euler.x = Math.max(-PI_2, Math.min(PI_2_mobile, euler.x));
      // euler.y = Math.max(-PI_2y, Math.min(PI_2y, euler.y));

      euler.y += lastTouchEndCameraRotation.y;
      euler.x += lastTouchEndCameraRotation.x;

      camera.quaternion.setFromEuler(euler);
      console.log(yfromtouch);
    };

    const onTouchEnd = (e: TouchEvent) => {
      console.log("Touch end");
      lastTouchEndCameraRotation = new THREE.Euler().setFromQuaternion(
        camera.quaternion
      );

      setIsMoving(false);
    };

    useEffect(() => {
      return () => {};
    });

    return <PointerLockControls {...props} ref={controls} camera={camera} />;
  }
);

export default Controls;
