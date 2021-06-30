import { Button, Heading } from "@chakra-ui/react";
import React from "react";
import Layout from "../components/Layout";

type TransportationPageProps = {};

const TransportationPage = (props: TransportationPageProps): JSX.Element => {
  const onClick = () => {
    console.log("Terve");

    // createChannel("Uusi kanava", "Hieno uusi kanava");
  };

  return (
    <Layout title="Kyytilöiset">
      <Heading>Terve</Heading>
      <Button onClick={onClick}>Luo telegram kanava</Button>
    </Layout>
  );
};

export default TransportationPage;
