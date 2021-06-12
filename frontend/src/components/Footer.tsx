import { Box, BoxProps, Flex, Heading } from "@chakra-ui/react";
import { Link } from "gatsby";
import React from "react";
import Section from "./Section";

type FooterProps = BoxProps & {};

const Footer = ({ ...boxProps }: FooterProps): JSX.Element => {
  return (
    <Section as="footer" bg="blackAlpha.800" {...boxProps}>
      <Heading as="h2" textAlign="center" size="md" mb="5">
        Pikalinkit laiskoille avaruusmatkailijoille
      </Heading>
      <Flex
        alignItems={{ base: "center", md: "center" }}
        direction={{ base: "column", md: "row" }}
        justifyContent={{ base: "center", md: "space-around" }}
        width="100%"
      >
        <Link to="/info">Info</Link>
        <Link to="/programme">Ohjelma</Link>
        <Link to="/telegram">Telegram</Link>
      </Flex>
    </Section>
  );
};

export default Footer;
