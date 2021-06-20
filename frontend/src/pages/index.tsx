import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Camera,
  Canvas,
  RootState,
  useFrame,
  useThree,
} from "@react-three/fiber";
import { PointerLockControls, Stars, useProgress } from "@react-three/drei";
import { OrbitControls as OrbitControlsType } from "three-stdlib";
import SpaceShip from "../components/three/SpaceShip";
import * as THREE from "three";
import { Box } from "@chakra-ui/layout";
import useGlobal from "../store";
import { OrbitControls } from "../components/three/Controls";
import Loader from "../components/three/Loader";
import { graphql, navigate } from "gatsby";
import Portal from "../components/three/Portal";
import { Flex, Heading, useMediaQuery } from "@chakra-ui/react";
import Layout from "../components/Layout";
import TextMesh from "../components/three/TextMesh";

// Needs to start from atleast 10 z to show html in center
const cameraBasePosition: [number, number, number] = [0, 0, 10];
const targetFromBase = 200;

const Scene = () => {
  // const [isMoving, setIsMoving] = useGlobal(
  //   state => state.isMoving,
  //   actions => actions.setIsMoving
  // );
  // const [isLoadingAssets, setIsLoadingAssets] = useGlobal(
  //   state => state.isLoadingAssets,
  //   actions => actions.setIsLoadingAssets
  // );
  // const [isNavigatingOut, setIsNavigatingOut] = useGlobal(
  //   state => state.isNavigatingOut,
  //   actions => actions.setIsNavigatingOut
  // );
  // const [isNavigatingIn, setIsNavigatingIn] = useGlobal(
  //   state => state.isNavigatingIn,
  //   actions => actions.isNavigatingIn
  // );

  const [state, actions] = useGlobal();
  const [initialSpaceShipPosSet, setInitialSpaceShipPosSet] = useState(false);

  const [cameraTargetChangeCounter, setCameraTargetChangeCounter] = useState(0);

  const [cameraTarget, setCameraTarget] = useState<THREE.Vector3>(
    new THREE.Vector3(
      cameraBasePosition[0],
      cameraBasePosition[1],
      cameraBasePosition[2] - targetFromBase
    )
  );

  const [timeWhenLoaded, setTimeWhenLoaded] = useState(-1);

  const [isMobile] = useMediaQuery("(max-width: 992px)");

  const { active } = useProgress();

  const { camera } = useThree();
  const setPointerLockControls = useCallback((node: PointerLockControls) => {
    if (node !== null && node.addEventListener) {
      node.addEventListener("lock", () => {
        actions.setIsMoving(true);
      });
      node.addEventListener("unlock", () => {
        actions.setIsMoving(false);
      });
    }
  }, []);

  const orbitControls = useRef<OrbitControlsType>(null);

  const spaceShipRef = useRef<THREE.Mesh>(null);

  const portals: THREE.Mesh[] = [];
  const setPortal = useCallback(
    (node: THREE.Mesh) => {
      if (node !== null && !portals.includes(node)) {
        portals.push(node);
      }
    },
    [portals]
  );
  const setMainText = useCallback(
    (node: THREE.Mesh) => {
      if (node !== null) {
        node.geometry.center();
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
  const alignSpaceShipWithCamera = () => {
    const spaceShip = spaceShipRef.current;

    if (spaceShip) {
      spaceShip.rotation.copy(camera.rotation);
      spaceShip.position.copy(camera.position);
      spaceShip.updateMatrix();
      spaceShip.translateZ(-50);
      spaceShip.translateY(-10);
      spaceShip.rotateY(-Math.PI / 2);
      spaceShip.rotateZ(-Math.PI / 12);
    }
  };

  const handleCollisions = () => {
    const spaceShip = spaceShipRef.current;
    if (spaceShip) {
      const spaceShipBox = new THREE.Box3().setFromObject(spaceShip);
      portals.forEach(portal => {
        const portalBox = new THREE.Box3().setFromObject(portal);
        const collision = spaceShipBox.intersectsBox(portalBox);
        if (collision) {
          const portalLink = getPortalLink(portal);
          if (portalLink) {
            actions.setIsNavigatingOut(true);
            actions.setIsMoving(false);
            setTimeout(() => {
              navigate(portalLink);
            }, 1000);
          }
        }
      });
    }
  };

  const moveCamera = (state: RootState) => {
    camera.translateZ(isMobile ? -1.5 : -2);
    // Update orbit camera target to fix weird rotate
    if (state.clock.elapsedTime > cameraTargetChangeCounter) {
      setCameraTargetChangeCounter(Math.floor(state.clock.elapsedTime) + 1);
      const newCamera = camera.clone();
      newCamera.translateZ(-targetFromBase);
      const { position } = newCamera;
      setCameraTarget(new THREE.Vector3(position.x, position.y, position.z));
    }
    if (orbitControls.current) {
      orbitControls.current.update();
    }
    alignSpaceShipWithCamera();
  };

  useFrame(threeState => {
    const spaceShip = spaceShipRef.current;

    handleCollisions();

    if (state.isMoving) {
      moveCamera(threeState);
    }

    // Navigate out, send spaceship far
    if (state.isNavigatingOut && spaceShipRef.current) {
      spaceShipRef.current.translateX(-5);
    }

    if (!active && timeWhenLoaded < 0) {
      setTimeWhenLoaded(threeState.clock.elapsedTime);
    }

    if (!active && state.isPromptOpen) {
      setTimeWhenLoaded(threeState.clock.getElapsedTime());
    }

    // Navigate in, zoom to space ship
    if (state.isNavigatingIn && !active && !state.isPromptOpen) {
      if (camera.position.z < cameraBasePosition[2]) {
        actions.setIsNavigatingIn(false);
      } else {
        camera.translateZ(-(threeState.clock.elapsedTime - timeWhenLoaded) * 3);
      }
    }
  });

  useEffect(() => {
    if (!state.isLoadingAssets && active) {
      actions.setIsLoadingAssets(true);
    }
    if (state.isLoadingAssets && !active) {
      actions.setIsLoadingAssets(false);
    }
  }, [active, state]);

  return (
    <>
      {isMobile ? (
        <OrbitControls ref={orbitControls} target={cameraTarget} />
      ) : (
        <PointerLockControls ref={setPointerLockControls} />
      )}
      <Stars depth={400} />
      <ambientLight intensity={0.5} />
      <Suspense fallback={<Loader />}>
        <SpaceShip
          ref={spaceShipRef}
          scale={isMobile ? 1 : 1.5}
          rotation={[0, -Math.PI / 2, -Math.PI / 12]}
          position={[
            cameraBasePosition[0],
            cameraBasePosition[1] - 10,
            cameraBasePosition[2] - 50,
          ]}
        />
        <Portal
          ref={setPortal}
          title="Ohjelma"
          scale={10}
          position={[200, 0, cameraBasePosition[2] - 500]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <Portal
          ref={setPortal}
          title="Info"
          scale={10}
          position={[0, 0, cameraBasePosition[2] - 550]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <Portal
          ref={setPortal}
          title="Telegram"
          scale={10}
          position={[-200, 0, cameraBasePosition[2] - 500]}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <TextMesh
          ref={setMainText}
          text="Cottage flow"
          position={[
            cameraBasePosition[0],
            cameraBasePosition[1],
            cameraBasePosition[2] + 50,
          ]}
          textOptions={{ size: 20 }}
        />
      </Suspense>
    </>
  );
};

const IndexPage = () => {
  const [isMoving, setIsMoving] = useGlobal(
    state => state.isMoving,
    actions => actions.setIsMoving
  );
  const isLoadingAssets = useGlobal(state => state.isLoadingAssets)[0];
  const isNavigatingOut = useGlobal(state => state.isNavigatingOut)[0];
  const isNavigatingIn = useGlobal(
    state => state.isNavigatingIn,
    actions => actions.setIsNavigatingIn
  )[0];

  return (
    <Layout
      onlySeo
      animation={{ from: { opacity: 0 }, to: { opacity: 1 } }}
      exitAnimation={{
        transition: { duration: 0 },
      }}
    >
      <Box width="100%" height="100vh" bg="black">
        {typeof window !== "undefined" && (
          <>
            <Canvas
              id="canvas"
              camera={{
                position: [
                  cameraBasePosition[0],
                  cameraBasePosition[1],
                  cameraBasePosition[2] + 500,
                ],
                rotation: [0, 0, 0],
              }}
            >
              <Scene />
            </Canvas>
            <Flex
              display={
                isMoving || isLoadingAssets || isNavigatingIn || isNavigatingOut
                  ? "none"
                  : "flex"
              }
              position="absolute"
              top="0"
              width="100%"
              height="100vh"
              alignItems="center"
              justifyContent="center"
              bg="rgba(0, 0, 0, 0.7)"
              onClick={() => {
                setIsMoving(true);
              }}
            >
              <Heading
                as="h1"
                textAlign="center"
                color="white"
                position="absolute"
                fontSize={{ base: "2xl", md: "4xl" }}
                top="100px"
              >
                Painase näytöstä ja liiku vetelemeällä
              </Heading>
            </Flex>
          </>
        )}
      </Box>
    </Layout>
  );
};

export default IndexPage;
