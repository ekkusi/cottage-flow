import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Canvas,
  MeshProps,
  ReactThreeFiber,
  useFrame,
  useThree,
} from "@react-three/fiber";
import {
  DeviceOrientationControls,
  Html,
  OrbitControls,
  PointerLockControls,
  PointerLockControlsProps,
  Stars,
  useProgress,
} from "@react-three/drei";
import { OrbitControls as OrbitControlsType } from "three-stdlib";
import SpaceShip from "../components/three/SpaceShip";
import * as THREE from "three";
import { Box } from "@chakra-ui/layout";
import useGlobal from "../store";
import Controls, { MobileControls } from "../components/three/Controls";
import Loader from "../components/three/Loader";
import { navigate } from "gatsby";
import Portal from "../components/three/Portal";
import { Flex, Heading, useMediaQuery } from "@chakra-ui/react";
import Layout from "../components/Layout";

// type OrbitControlsType = ReactThreeFiber.Object3DNode<OrbitControlsImpl, typeof OrbitControlsImpl>

const cameraBasePosition = new THREE.Vector3(0, 0, 10);
const targetFromBase = 200;

const Scene = () => {
  const [isMoving, setIsMoving] = useGlobal(
    state => state.isMoving,
    actions => actions.setIsMoving
  );
  const [isLoadingAssets, setIsLoadingAssets] = useGlobal(
    state => state.isLoadingAssets,
    actions => actions.setIsLoadingAssets
  );

  const [cameraTargetChangeCounter, setCameraTargetChangeCounter] = useState(0);

  const [cameraTarget, setCameraTarget] = useState<THREE.Vector3>(
    new THREE.Vector3(
      cameraBasePosition.x,
      cameraBasePosition.y,
      cameraBasePosition.z - targetFromBase
    )
  );

  const [isMobile] = useMediaQuery("(max-width: 992px)");

  const { active } = useProgress();

  const { camera } = useThree();
  const setPointerLockControls = useCallback((node: PointerLockControls) => {
    if (node !== null && node.addEventListener) {
      node.addEventListener("lock", () => {
        setIsMoving(true);
      });
      node.addEventListener("unlock", () => {
        setIsMoving(false);
      });
    }
  }, []);

  const orbitControls = useRef<OrbitControlsType>(null);

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

  useFrame(state => {
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
      camera.translateZ(-2);
      // Update orbit camera target to fix weird rotate. Only on mobile
      if (isMobile && state.clock.elapsedTime > cameraTargetChangeCounter) {
        setCameraTargetChangeCounter(Math.floor(state.clock.elapsedTime) + 1);
        const newCamera = camera.clone();
        newCamera.translateZ(-targetFromBase);
        const { position } = newCamera;
        setCameraTarget(new THREE.Vector3(position.x, position.y, position.z));
      }
      if (orbitControls.current) {
        orbitControls.current.update();
      }
    }
  });

  // useFrame(state => {
  //   if (isMoving) {
  //     if (state.clock.elapsedTime > cameraTargetChangeCounter) {
  //       setCameraTargetChangeCounter(Math.floor(state.clock.elapsedTime) + 1);
  //       console.log("Doing heavy stuff");
  //       const newCamera = camera.clone();
  //       newCamera.translateZ(-100);
  //       const { position } = newCamera;
  //       // const newCameraTarget = camera.position.clone();
  //       setCameraTarget(new THREE.Vector3(position.x, position.y, position.z));
  //     }
  //   }
  // }, 50);

  useEffect(() => {
    if (!isLoadingAssets && active) {
      setIsLoadingAssets(true);
    }
    if (isLoadingAssets && !active) {
      setIsLoadingAssets(false);
    }
    // camera.lookAt(new THREE.Vector3(0, 0, cameraBasePosition.z - 100));
  }, [active, isLoadingAssets]);

  return (
    <>
      {isMobile ? (
        <MobileControls ref={orbitControls} target={cameraTarget} />
      ) : (
        <Controls ref={setPointerLockControls} />
      )}
      <Stars depth={300} />
      <ambientLight intensity={0.5} />
      <Suspense fallback={<Loader />}>
        <SpaceShip
          ref={spaceShip}
          scale={2}
          rotation={[0, -Math.PI / 2, -Math.PI / 24]}
          // position={[0, -20, 1200]}
        />
        <Portal
          ref={setPortal}
          title="Ohjelma"
          scale={10}
          position={[300, 0, cameraBasePosition.z - 300]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <Portal
          ref={setPortal}
          title="Info"
          scale={10}
          position={[0, 0, cameraBasePosition.z - 350]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <Portal
          ref={setPortal}
          title="Telegram"
          scale={10}
          position={[-300, 0, cameraBasePosition.z - 300]}
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
          <>
            <Canvas
              camera={{ position: cameraBasePosition, rotation: [0, 0, 0] }}
            >
              <Scene />
            </Canvas>
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
          </>
        )}
      </Box>
    </Layout>
  );
};

export default IndexPage;
