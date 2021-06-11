import { MeshProps, useFrame, useThree } from "@react-three/fiber";
import React, { forwardRef, useRef } from "react";
import * as THREE from "three";
import useForwardedRef from "../../hooks/useForwardedRef";
import CustomModel from "./CustomModel";

type SpaceShipProps = MeshProps & {};

const SpaceShip = forwardRef<THREE.Mesh, SpaceShipProps>(
  ({ ...meshProps }, ref): JSX.Element => {
    // const mesh = useForwardedRef<THREE.Mesh>(ref);
    const mesh = useForwardedRef<THREE.Mesh>(ref);

    const { camera } = useThree();

    useFrame((state, delta) => {
      const spaceShip = mesh.current;

      if (spaceShip) {
        spaceShip.rotation.copy(camera.rotation);
        spaceShip.position.copy(camera.position);
        spaceShip.updateMatrix();
        spaceShip.translateZ(-50);
        spaceShip.rotateY(-Math.PI / 2);
        spaceShip.rotateZ(-Math.PI / 12);
        // new THREE.Box3().setFromObject(spaceShip);
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
