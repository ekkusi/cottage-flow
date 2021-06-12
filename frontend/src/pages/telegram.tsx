import * as React from "react";
import { Link } from "gatsby";

import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { Heading, Text } from "@chakra-ui/react";

const TelegramPage = () => (
  <Layout title="Telegram">
    <Text>
      Viimeisimmät tilannepäivitykset, hypetykset ja muut hömpänpömpät jaellaan
      erittäin virallisessa Telegram-ryhmässä.
    </Text>
    <Heading as="h2" textAlign="center" mt="10">
      <Text as="span" display={{ base: "block", md: "inline-block" }}>
        🔥🔥
      </Text>{" "}
      <a href="https://t.me/joinchat/mtLB8RNoc103ZTQ0">Liity ryhmään tästä</a>{" "}
      <Text as="span" display={{ base: "block", md: "inline-block" }}>
        🔥🔥
      </Text>
    </Heading>
  </Layout>
);

export default TelegramPage;
