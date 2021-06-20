import { Program as SanityProgram } from "./sanity-schema";

export type Program = SanityProgram & {
  image: {
    asset: {
      url?: string;
    };
  };
};
