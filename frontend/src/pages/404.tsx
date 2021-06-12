import { Heading, Link, Text } from "@chakra-ui/react";
import * as React from "react";

import Layout from "../components/Layout";

const NotFoundPage = () => (
  <Layout title="404">
    <Heading as="h1" mb="5" textAlign="center">
      🚫 404 🚫
    </Heading>
    <Text>
      Oho! Löysit madonreiän, joka tuppas sut ihme paikkoihin. Parempi varmaan
      palata takasin pääasemalle:)
    </Text>
    <Heading as="h2" textAlign="center">
      <Link to="/">Palaa takaisin</Link>
    </Heading>
  </Layout>
);

export default NotFoundPage;
