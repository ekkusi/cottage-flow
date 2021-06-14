import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { Box, Heading, Text } from "@chakra-ui/react";

type HeaderProps = {
  pageTitle: string;
};
const Header = ({ pageTitle }: HeaderProps) => (
  <Box as="header" px="5" py={{ base: "7", md: "10" }} position="relative">
    <Text as="span" mb={{ base: "10", md: "5" }} display="inline-block">
      <Link to="/">🚉 Takasin pääasemalle 🚉</Link>
    </Text>
    <Heading as="h1" size="4xl" textAlign="center" mb={{ base: "12", md: "5" }}>
      {pageTitle}
    </Heading>
  </Box>
);

export default Header;
