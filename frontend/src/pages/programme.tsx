import * as React from "react";
import { graphql, Link } from "gatsby";

import { Box, Button, Heading, Text } from "@chakra-ui/react";
import Layout from "../components/Layout";
import Section from "../components/Section";
import { useAsync } from "react-async-hook";
import { getPrograms } from "../api/program";
import PageQuery from "../types/PageQuery";
import { Program } from "../types/Program";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ProgrammePage = ({ data }: PageQuery<GatsbyTypes.ProgramsPageQuery>) => {
  const { loading, result, error, execute } = useAsync(getPrograms, []);

  const programs: Program[] = React.useMemo(() => {
    const staticPrograms = data.allSanityProgram.edges.map(it => it.node);
    const allPrograms = result ? result : (staticPrograms as Program[]);
    return allPrograms.sort(
      (a, b) =>
        new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
    );
  }, [data, result]);

  console.log(programs);

  return (
    <Layout title="Ohjelma">
      {programs.map(it => (
        <Box key={it._id}>
          <Heading as="h2" size="xl" mb="5">
            {it.name}
          </Heading>

          {it.image.asset.url && (
            <Box mb="5" textAlign="center">
              <LazyLoadImage
                alt={it.name}
                effect="blur"
                width={500}
                src={it.image.asset.url}
                wrapperProps={{ style: { display: "inline-block" } }}
              />
            </Box>
          )}
          <Text>{it.description}</Text>
        </Box>
      ))}
      {/* <Button onClick={() => execute()}>Hae uuvet ohjelmat</Button> */}
      {/* <Text>Malta tovi, tarkempi ohjelmisto päivittyy tänne pian:)</Text> */}
      <Section>
        <Heading as="h2" mb="5">
          Avoin mikki
        </Heading>
        <Text>
          Olennaistahan festareilla on saada mussiikkia tai muuta esitystä
          pystyyn. Tätä tulee toki talonkin puolesta, mutta järjestäjien
          henkiset ja fyysiset kapasiteetit riittävät kuitenkin vain
          rajoitettuun määrään viihdettä sekä ohjelmaa.
        </Text>
        <Text textDecoration="underline">Mikä avuksi?</Text>
        <Text>
          No juurikin{" "}
          <Text as="span" fontSize="3xl">
            SINÄ (JA TOVERISI)!
          </Text>
        </Text>
        <Text mb="10">
          Näillä festareilla on kenellä tahansa mahdollisuus (erittäinen
          suositellusti) pistää pystyyn oma esitys ja päästää oma showhenkilö
          valloilleen. Suunnittele siis (tai ole suunnittelematta) esitys
          viikonlopulle ja astu lavalle:)
        </Text>
        <Heading as="h3" size="lg" mb="5">
          HUOM!
        </Heading>
        <Text>
          Esityksen tai ohjelmanumeron ei tietenkään pakko ole olla musiikkia.
          Jos ideasi on pitää ohjelma kaljakellunnasta Fröbelin Palikoiden
          taustoittamana, kilpailu hienoimman hiekkalinnan rakentamisesta tai
          mitä tahansa näiden väliltä, on se kelpoinen näille kemuille!
        </Text>
      </Section>
    </Layout>
  );
};

export default ProgrammePage;

export const query = graphql`
  query ProgramsPage {
    allSanityProgram {
      edges {
        node {
          description
          name
          image {
            asset {
              url
            }
          }
          _createdAt
          _id
          _key
          _rev
          _type
          _updatedAt
        }
      }
    }
  }
`;
