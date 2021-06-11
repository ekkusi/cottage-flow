import * as React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";

const InfoPage = () => (
  <Layout>
    <Seo title="Info" />
    <h1>Hi from the menu page</h1>
    <p>Welcome to menu page</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
);

export default InfoPage;
