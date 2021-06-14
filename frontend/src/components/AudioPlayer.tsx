import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Icon,
  Text,
} from "@chakra-ui/react";
import React, { createRef, useCallback, useRef, useState } from "react";
import H5AudioPlayer from "react-h5-audio-player";
import AudioPlayerBase from "react-h5-audio-player";
import { AiOutlineSound } from "react-icons/ai";

import "react-h5-audio-player/lib/styles.css";
import chakraMotionWrapper from "../utils/chakraMotionWrapper";
import { useAnimation } from "framer-motion";
import { ControlsAnimationDefinition } from "framer-motion/types/animation/types";
import { useEffect } from "react";
import useGlobal from "../store";

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
  autoPlay,
  ...audioProps
}: AudioPlayerProps): JSX.Element => {
  const [currentAudio, setCurrentAudio] = useState(tracks[0]);
  const [showControls, setShowControls] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasSeenPrompt, setHasSeenPrompt] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useGlobal(
    state => state.isPromptOpen,
    actions => actions.setIsPromptOpen
  );
  const ref = useRef<H5AudioPlayer>(null);
  const yesButton = useRef<HTMLButtonElement>(null);

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

  const onAllowMusic = () => {
    setIsPromptOpen(false);
    const audio = ref.current?.audio?.current;
    if (audio) {
      audio.muted = false;
      audio.play();
    }
  };

  useEffect(() => {
    const audio = ref.current?.audio?.current;
    if (autoPlay && audio && !hasSeenPrompt) {
      const playPromise = audio.play();
      playPromise.catch(() => {
        setHasSeenPrompt(true);
        audio.muted = true;
        setTimeout(() => {
          setIsPromptOpen(true);
        }, 2000);
      });
    }
  });

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
      <AlertDialog
        leastDestructiveRef={yesButton}
        onClose={() => setIsPromptOpen(false)}
        isOpen={isPromptOpen && !isPlaying}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Saisinko soittaa sinulle musiikkia täällä käydessäsi?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={yesButton} mr={3} onClick={onAllowMusic}>
              JOO!!
            </Button>
            <Button variant="outline" onClick={() => setIsPromptOpen(false)}>
              Ei kiitos:(
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Box {...containerProps} display={showControls ? "block" : "none"}>
        <AudioPlayerBase
          ref={ref}
          src={currentAudio.src}
          onEnded={loadNextTrack}
          onClickNext={loadNextTrack}
          onClickPrevious={loadPreviousTrack}
          showSkipControls
          onPlay={() => {
            console.log("On Play");

            setIsPlaying(true);
            setHasSeenPrompt(true);
            animationControls.start(animation);
          }}
          onPause={() => {
            setIsPlaying(false);
            animationControls.set(initialAnimationState);
            animationControls.stop();
          }}
          onPlayError={() => {}}
          onCanPlay={() => {
            setIsPlaying(true);
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
