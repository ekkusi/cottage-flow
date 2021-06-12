import * as React from "react";
import { Link } from "gatsby";

import { Heading, Text } from "@chakra-ui/react";
import Layout from "../components/Layout";
import Section from "../components/Section";

const ProgrammePage = () => (
  <Layout title="Ohjelma">
    <Text>Malta tovi, tarkempi ohjelmisto päivittyy tänne pian:)</Text>
    <Section>
      <Heading as="h2" mb="5">
        Avoin mikki
      </Heading>
      <Text>
        Olennaistahan festareilla on saada mussiikkia tai muuta esitystä
        pystyyn. Tätä tulee toki talonkin puolesta, mutta järjestäjien henkiset
        ja fyysiset kapasiteetit riittävät kuitenkin vain rajoitettuun määrään
        viihdettä.
      </Text>
      <Text textDecoration="underline">Mikä avuksi?</Text>
      <Text>
        No juurikin{" "}
        <Text as="span" fontSize="3xl">
          SINÄ (JA KUMMPANISI)!
        </Text>
      </Text>
      <Text>
        Näillä festareilla on kenellä tahansa mahdollisuus (erittäinen
        suositellusti) pistää pystyyn oma esitys ja päästää oma showhenkilö
        valloilleen. Suunnittele siis (tai ole suunnittelematta) esitys
        viikonlopulle ja astu lavalle:)
      </Text>
    </Section>
  </Layout>
);

export default ProgrammePage;
