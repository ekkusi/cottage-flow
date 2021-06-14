/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { globalHistory } from "@reach/router";

import Header from "./Header";
import "./layout.css";
import { Container, Flex } from "@chakra-ui/react";
import Seo from "./Seo";
import Footer from "./Footer";
import { useEffect } from "react";
import useGlobal from "../store";
import { motion, TargetAndTransition, Variant } from "framer-motion";

type AnimationVariants = {
  from: Variant;
  to: Variant;
};

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  onlySeo?: boolean;
  animation?: AnimationVariants;
  exitAnimation?: TargetAndTransition;
};

const Layout = ({
  title,
  onlySeo = false,
  animation = {
    from: { scale: 0 },
    to: { scale: 1 },
  },
  exitAnimation,
  children,
}: LayoutProps) => {
  const setIsNavigatingOut = useGlobal(
    () => {},
    actions => actions.setIsNavigatingOut
  )[1];
  const setIsNavigatingIn = useGlobal(
    () => {},
    actions => actions.setIsNavigatingIn
  )[1];

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const siteTitle = data.site.siteMetadata?.title || "Title";

  useEffect(() => {
    return globalHistory.listen(({ action, location }) => {
      if (action === "PUSH") {
        if (location.pathname === "/") {
          setIsNavigatingIn(true);
        } else {
          setIsNavigatingOut(false);
        }
      }
    });
  }, [setIsNavigatingIn, setIsNavigatingOut]);

  return (
    <>
      <motion.div
        key={globalHistory.location.pathname}
        initial="from"
        animate="to"
        variants={animation}
        exit={exitAnimation || "from"}
        transition={{ duration: 0.5 }}
      >
        <Seo title={title} />
        {!onlySeo ? (
          <Flex minHeight="100vh" direction="column">
            <Header pageTitle={title || siteTitle} />
            <Container
              as="main"
              maxWidth="1000px"
              px={{ base: "3", xl: "0" }}
              pb="10"
            >
              {children}
            </Container>
            <Footer mt="auto" />
          </Flex>
        ) : (
          children
        )}
      </motion.div>
    </>
  );
};

export default Layout;
