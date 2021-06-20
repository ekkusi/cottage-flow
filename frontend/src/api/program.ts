import { Program } from "../types/Program";
import sanity from "./index";

export const getPrograms = async () => {
  const data = await sanity.query<Program>(`
    *[_type=="program"] | order(_createdAt desc) {
      ...,
      "image": {
        "asset": {
          "url": image.asset->url
        }
      }
    }
  `);
  return data;
};
