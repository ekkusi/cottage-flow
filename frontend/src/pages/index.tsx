import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Canvas, MeshProps, useFrame, useThree } from "@react-three/fiber";
import {
  Html,
  PointerLockControls,
  PointerLockControlsProps,
  Stars,
  useProgress,
} from "@react-three/drei";
import SpaceShip from "../components/three/SpaceShip";
import * as THREE from "three";
import { Box } from "@chakra-ui/layout";
import useGlobal from "../store";
import Controls from "../components/three/Controls";
import Loader from "../components/three/Loader";
import { navigate } from "gatsby";
import Portal from "../components/three/Portal";
import { Flex, Heading } from "@chakra-ui/react";
import Layout from "../components/Layout";

const Scene = () => {
  const [isMoving, setIsMoving] = useGlobal(
    state => state.isMoving,
    actions => actions.setIsMoving
  );
  const [isLoadingAssets, setIsLoadingAssets] = useGlobal(
    state => state.isLoadingAssets,
    actions => actions.setIsLoadingAssets
  );

  const { active } = useProgress();

  const { camera } = useThree();
  const setControlsCb = useCallback((node: PointerLockControls) => {
    if (node !== null && node.addEventListener) {
      node.addEventListener("lock", () => {
        setIsMoving(true);
      });
      node.addEventListener("unlock", () => {
        setIsMoving(false);
      });
    }
  }, []);

  const spaceShip = useRef<THREE.Mesh>(null);

  const portals: THREE.Mesh[] = [];
  const setPortal = useCallback(
    (node: THREE.Mesh) => {
      if (node !== null && !portals.includes(node)) {
        portals.push(node);
      }
    },
    [portals]
  );

  const getPortalLink = (portal: THREE.Mesh) => {
    const index = portals.findIndex(it => portal === it);

    if (index < 0) return null;

    switch (index) {
      case 0:
        return "/programme";
      case 1:
        return "/info";
      case 2:
        return "/telegram";
      default:
        return "/info";
    }
  };

  useFrame(() => {
    if (spaceShip.current) {
      const spaceShipBox = new THREE.Box3().setFromObject(spaceShip.current);
      portals.forEach(portal => {
        const portalBox = new THREE.Box3().setFromObject(portal);
        const collision = spaceShipBox.intersectsBox(portalBox);
        if (collision) {
          const portalLink = getPortalLink(portal);
          if (portalLink) {
            setIsMoving(false);
            navigate(portalLink);
          }
        }
      });
    }

    if (isMoving) {
      camera.translateZ(-1);
    }
  });

  useEffect(() => {
    if (!isLoadingAssets && active) {
      setIsLoadingAssets(true);
    }
    if (isLoadingAssets && !active) {
      setIsLoadingAssets(false);
    }
  }, [active, isLoadingAssets]);

  return (
    <>
      <Controls ref={setControlsCb} />
      <Stars depth={500} />
      <ambientLight intensity={0.5} />
      <Suspense fallback={<Loader />}>
        <SpaceShip
          ref={spaceShip}
          scale={2}
          rotation={[0, -Math.PI / 2, -Math.PI / 24]}
          // position={[0, -20, 0]}
        />
        <Portal
          ref={setPortal}
          title="Ohjelma"
          scale={10}
          position={[300, -50, -300]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <Portal
          ref={setPortal}
          title="Info"
          scale={10}
          position={[0, -50, -350]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <Portal
          ref={setPortal}
          title="Telegram"
          scale={10}
          position={[-300, -50, -300]}
          rotation={[0, -Math.PI / 4, 0]}
        />
      </Suspense>
    </>
  );
};

const IndexPage = () => {
  const isMoving = useGlobal(state => state.isMoving)[0];
  const isLoadingAssets = useGlobal(state => state.isLoadingAssets)[0];
  return (
    <Layout onlySeo>
      <Box width="100%" height="100vh" bg="black">
        {typeof window !== "undefined" && (
          <Canvas camera={{ position: [0, 20, 50] }}>
            <Scene />
          </Canvas>
        )}
        <Flex
          display={isMoving || isLoadingAssets ? "none" : "flex"}
          position="absolute"
          top="0"
          width="100%"
          height="100vh"
          alignItems="center"
          justifyContent="center"
          bg="rgba(0, 0, 0, 0.7)"
        >
          <Heading
            as="h1"
            textAlign="center"
            color="white"
            position="absolute"
            top="100px"
          >
            Painaseppa näytöstä ja pistä alus liikkeelle
          </Heading>
        </Flex>
      </Box>
    </Layout>
  );
};

export default IndexPage;
