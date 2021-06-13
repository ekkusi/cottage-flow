/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { globalHistory } from "@reach/router";

import Header from "./Header";
import "./layout.css";
import { Box, Container, Flex } from "@chakra-ui/react";
import Seo from "./Seo";
import Footer from "./Footer";
import { useEffect } from "react";
import useGlobal from "../store";
import actions from "../store/actions";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  onlySeo?: boolean;
};

const Layout = ({ title, onlySeo = false, children }: LayoutProps) => {
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
          console.log("Navigating to home");
          setIsNavigatingIn(true);
        } else {
          console.log("Navigating out of home");
          setIsNavigatingOut(false);
        }
      }
    });
  }, [setIsNavigatingIn, setIsNavigatingOut]);

  return (
    <>
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
    </>
  );
};

export default Layout;
