import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

type SectionProps = BoxProps & {
  children: React.ReactNode;
};

const Section = ({ children, ...boxProps }: SectionProps): JSX.Element => {
  return (
    <Box as="section" py="10" {...boxProps}>
      {children}
    </Box>
  );
};

export default Section;
