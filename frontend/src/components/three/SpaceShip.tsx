import { MeshProps, useFrame, useThree } from "@react-three/fiber";
import React, { forwardRef, useRef, useState } from "react";
import { useEffect } from "react";
import * as THREE from "three";
import useForwardedRef from "../../hooks/useForwardedRef";
import useGlobal from "../../store";
import CustomModel from "./CustomModel";

type SpaceShipProps = MeshProps & {};

const SpaceShip = forwardRef<THREE.Mesh, SpaceShipProps>(
  ({ ...meshProps }, ref): JSX.Element => {
    const mesh = useForwardedRef<THREE.Mesh>(ref);

    return (
      <mesh ref={mesh} {...meshProps}>
        <CustomModel assetPath="/space-ship.gltf" />
      </mesh>
    );
  }
);

export default SpaceShip;
