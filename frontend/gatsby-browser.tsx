import React from "react";
import { AnimatePresence } from "framer-motion";
import { WrapPageElementNodeArgs } from "gatsby";

export const wrapPageElement = ({
  props,
  element,
}: WrapPageElementNodeArgs) => {
  console.log(props);

  return <AnimatePresence exitBeforeEnter>{element}</AnimatePresence>;
};
