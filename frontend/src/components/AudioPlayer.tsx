import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Icon,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useRef, useState } from "react";
import H5AudioPlayer from "react-h5-audio-player";
import AudioPlayerBase from "react-h5-audio-player";
import { AiOutlineSound } from "react-icons/ai";

import "react-h5-audio-player/lib/styles.css";
import chakraMotionWrapper from "../utils/chakraMotionWrapper";
import { useAnimation } from "framer-motion";
import { ControlsAnimationDefinition } from "framer-motion/types/animation/types";

type AudioPlayerProps = H5AudioPlayer["props"] & {
  containerProps?: BoxProps;
  buttonProps?: BoxProps;
};
type Track = {
  src: string;
  name: string;
};
const tracks: Track[] = [
  {
    src: "/music/01_Scape_Main.mp3",
    name: "Scape Main",
  },
  {
    src: "/music/03_Harmony.mp3",
    name: "Harmony",
  },
  {
    src: "/music/07_Barbarianism.mp3",
    name: "Barbarianism",
  },
  {
    src: "/music/13_Adventure.mp3",
    name: "Adventure",
  },
  {
    src: "/music/17_Fanfare.mp3",
    name: "Fanfare",
  },
];

const BoxWithMotion = chakraMotionWrapper(Box);

const AudioPlayer = ({
  containerProps,
  buttonProps,
  ...audioProps
}: AudioPlayerProps): JSX.Element => {
  const [currentAudio, setCurrentAudio] = useState(tracks[0]);
  const [showControls, setShowControls] = useState(false);

  const animationControls = useAnimation();

  const animation: ControlsAnimationDefinition = {
    scale: 1.2,
    opacity: 1,
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "reverse",
    },
  };

  const initialAnimationState = {
    scale: 1,
    opacity: 0.8,
  };

  const loadNextTrack = () => {
    const currentIndex = tracks.findIndex(audio => audio === currentAudio);
    if (currentIndex < 0) return;
    if (currentIndex + 1 === tracks.length) {
      setCurrentAudio(tracks[0]);
    } else {
      setCurrentAudio(tracks[currentIndex + 1]);
    }
  };

  const loadPreviousTrack = () => {
    const currentIndex = tracks.findIndex(audio => audio === currentAudio);
    if (currentIndex < 0) return;
    if (currentIndex - 1 < 0) {
      setCurrentAudio(tracks[tracks.length - 1]);
    } else {
      setCurrentAudio(tracks[currentIndex - 1]);
    }
  };

  return (
    <>
      <Box
        display={showControls ? "none" : "block"}
        as="span"
        _hover={{ cursor: "pointer" }}
        onClick={() => {
          console.log("Clicking");

          setShowControls(true);
        }}
        {...buttonProps}
      >
        <BoxWithMotion
          initial={initialAnimationState}
          animate={animationControls}
        >
          <Icon as={AiOutlineSound} w={30} h={30} />
        </BoxWithMotion>
      </Box>
      <Box {...containerProps} display={showControls ? "block" : "none"}>
        <AudioPlayerBase
          src={currentAudio.src}
          onEnded={loadNextTrack}
          onClickNext={loadNextTrack}
          onClickPrevious={loadPreviousTrack}
          showSkipControls
          onPlay={() => {
            animationControls.start(animation);
          }}
          onPause={() => {
            animationControls.set(initialAnimationState);
            animationControls.stop();
          }}
          header={
            <Box color="#333" textAlign="center" position="relative">
              <Text fontSize="sm" fontStyle="italic" mb="1">
                Nyt soi
              </Text>
              <Text mb="0">{currentAudio.name}</Text>
              <Button
                variant="link"
                color="inherit"
                position="absolute"
                top="0"
                right="0"
                opacity="0.7"
                minWidth="auto"
                _hover={{ textDecoration: "none", opacity: 0.5 }}
                fontSize="2xl"
                onClick={() => {
                  setShowControls(false);
                }}
              >
                {"\u2715"}
              </Button>
            </Box>
          }
          {...audioProps}
        />
      </Box>
    </>
  );
};

export default AudioPlayer;
