import React from "react";
import Layout from "../components/Layout";
import { AnimatePresence } from "framer-motion";

const CustomLayout = ({ element, props }, pluginOptions) => {
  console.log(element);
  console.log(props);
  return (
    <AnimatePresence exitBeforeEnter {...props}>
      {element}
    </AnimatePresence>
  );
};

export default CustomLayout;
