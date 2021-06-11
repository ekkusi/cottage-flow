import * as React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";

const TelegramPage = () => (
  <Layout>
    <Seo title="Telegram" />
    <h1>Hi from the telegram page</h1>
    <p>Welcome to menu page</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
);

export default TelegramPage;
