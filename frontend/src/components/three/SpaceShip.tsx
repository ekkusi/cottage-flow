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
    // const mesh = useForwardedRef<THREE.Mesh>(ref);
    const [initialPosSet, setInitialPosSet] = useState(false);
    const isMoving = useGlobal(state => state.isMoving)[0];
    const mesh = useForwardedRef<THREE.Mesh>(ref);

    const { camera } = useThree();

    useFrame(() => {
      if (isMoving) {
        alignSpaceShipWithCamera();
      }
    });

    const alignSpaceShipWithCamera = () => {
      const spaceShip = mesh.current;

      if (spaceShip) {
        spaceShip.rotation.copy(camera.rotation);
        spaceShip.position.copy(camera.position);
        spaceShip.updateMatrix();
        spaceShip.translateZ(-50);
        spaceShip.translateY(-10);
        spaceShip.rotateY(-Math.PI / 2);
        spaceShip.rotateZ(-Math.PI / 12);

        if (!initialPosSet) {
          setInitialPosSet(true);
        }
      }
    };

    useEffect(() => {
      if (!initialPosSet) {
        alignSpaceShipWithCamera();
      }
    });
    return (
      <mesh ref={mesh} {...meshProps}>
        <CustomModel assetPath="/space-ship.gltf" />
      </mesh>
    );
  }
);

export default SpaceShip;
