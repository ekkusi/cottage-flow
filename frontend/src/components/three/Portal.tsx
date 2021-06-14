import { GroupProps, MeshProps, useFrame } from "@react-three/fiber";
import React, { forwardRef, useRef } from "react";
import { useCallback } from "react";
import * as THREE from "three";
import useForwardedRef from "../../hooks/useForwardedRef";
import CustomModel from "./CustomModel";
import TextMesh from "./TextMesh";

type PortalProps = GroupProps & {
  title: string;
};

const Portal = forwardRef<THREE.Mesh, PortalProps>(
  ({ title, ...groupProps }, ref): JSX.Element => {
    // const mesh = useForwardedRef<THREE.Mesh>(ref);
    const mesh = useRef<THREE.Mesh>(null);
    const textRef = useCallback((node: THREE.Mesh) => {
      if (node !== null) {
        node.geometry.center();
      }
    }, []);
    const rotateAxis: THREE.Vector3 = new THREE.Vector3(
      Math.PI / 2,
      0,
      0
    ).normalize();

    useFrame(() => {
      if (mesh.current) {
        mesh.current.rotateOnAxis(rotateAxis, 0.02);
      }
    });

    const getTextRotation = () => {
      const { rotation } = groupProps;
      if (rotation) {
        if (Array.isArray(rotation)) {
          const newRotationY = rotation[1] < 0 ? Math.PI / 2 : -Math.PI / 2;
          return new THREE.Euler(0, newRotationY, 0);
        } else {
          const newRotationY = rotation.y < 0 ? Math.PI / 2 : -Math.PI / 2;
          return new THREE.Euler(0, newRotationY, 0);
        }
      }
      return undefined;
    };

    return (
      <group ref={ref} {...groupProps}>
        <mesh ref={mesh}>
          <CustomModel assetPath="/modular-ring.gltf" />
        </mesh>
        <TextMesh
          ref={textRef}
          text={title}
          rotation={getTextRotation()}
          position={[0, 9, 0]}
          textOptions={{ size: 1.5, height: 0.25 }}
        />
      </group>
    );
  }
);

export default Portal;
