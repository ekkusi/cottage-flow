/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { WrapPageElementNodeArgs } from "gatsby";
import { Box, BoxProps, Text } from "@chakra-ui/react";

import AudioPlayer from "./src/components/AudioPlayer";

export const wrapPageElement = ({
  props,
  element,
}: WrapPageElementNodeArgs) => {
  const positionProps: BoxProps = {
    position: "fixed",
    top: 0,
    right: 0,
    zIndex: 50,
  };

  return (
    <>
      <AudioPlayer
        autoPlay
        containerProps={{
          ...positionProps,
          width: { base: "100%", md: "500px" },
        }}
        buttonProps={{
          ...positionProps,
          mt: "5",
          mr: "5",
        }}
      />
      <AnimatePresence exitBeforeEnter>{element}</AnimatePresence>
    </>
  );
};
