import sanityConfig from "./sanity.config.json";

module.exports = {
  siteMetadata: {
    title: `Cottage Flow`,
    description: `Number one festival of summer 2021!!! Rock on:D`,
    author: `ekkusi`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/launch.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    `@chakra-ui/gatsby-plugin`,
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: sanityConfig.id,
        dataset: sanityConfig.dataset,
        // a token with read permissions is required
        // if you have a private dataset
        token: sanityConfig.token,

        // If the Sanity GraphQL API was deployed using `--tag <name>`,
        // use `graphqlTag` to specify the tag name. Defaults to `default`.
        graphqlTag: "default",
        watchMode: true,
      },
    },
    `gatsby-plugin-typegen`,
    // ...
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
