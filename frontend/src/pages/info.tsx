import * as React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";

import Layout from "../components/Layout";
import Section from "../components/Section";

const InfoSubtitle: React.FC = ({ children }) => (
  <Text as="span" display="block" mb="2" textDecoration="underline">
    {children}
  </Text>
);

const InfoPage = () => (
  <Layout title="Cottage Flow">
    <Text>Etkö saanu lippua Naamoille tänäkään vuonna?</Text>
    <Text>
      Ei se mitään! Kesän vähintäänkin toiseksi parhaat vaihtoehtoiset festarit
      ovat täällä!
    </Text>
    <Section>
      <InfoSubtitle>Mitä?</InfoSubtitle>
      <Heading as="h2" mb="7">
        Ihan ensteks parhaat festarit:)
      </Heading>
      <InfoSubtitle>Milloin?</InfoSubtitle>
      <Heading as="h2" mb="7">
        9.7.- 11.7.
      </Heading>
      <InfoSubtitle>Missä?</InfoSubtitle>
      <Box mb="3">
        <StaticImage
          src="../images/kartta-plain.png"
          alt="Kartta onneen"
          placeholder="blurred"
          layout="fullWidth"
        />
      </Box>
      <Text as="a" href="https://goo.gl/maps/uuHe6wFTtazZgtdPA" target="_blank">
        No ok tässä Google Maps linkki jos ei muka tuosta saa selvää...
      </Text>
    </Section>
  </Layout>
);

export default InfoPage;
