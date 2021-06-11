import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { Heading } from "@chakra-ui/react";

const Header = ({ siteTitle }: any) => (
  <header>
    <Heading as="h1">
      <Link to="/">{siteTitle}</Link>
    </Heading>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
