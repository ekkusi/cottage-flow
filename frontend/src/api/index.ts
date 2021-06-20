import type { Documents } from "../types/sanity-schema";
import { createClient } from "sanity-codegen";
import sanityConfig from "../../sanity.config.json";

export default createClient<Documents>({
  projectId: sanityConfig.id,
  dataset: sanityConfig.dataset,
  apiVersion: "2021-06-16",
  useCdn: false,
  fetch,
});
