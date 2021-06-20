import { SanityCodegenConfig } from "sanity-codegen";

const config: SanityCodegenConfig = {
  schemaPath: "../studio/schemas/schema.js",
  outputPath: "./src/types/sanity-schema.ts",
  babelOptions: {
    ignore: [],
  },
};

export default config;
