import { Box, Flex } from "@chakra-ui/react";
import * as React from "react";

import Layout from "../components/Layout";

const MatiasHonkaniemiPage = () => (
  <Layout title="Matiakselle">
    <Flex justifyContent="center">
      <Box as="video" autoPlay controls width={{ base: "100%", sm: "350px" }}>
        <source src="/matias-2.mp4" />
      </Box>
    </Flex>
  </Layout>
);

export default MatiasHonkaniemiPage;
