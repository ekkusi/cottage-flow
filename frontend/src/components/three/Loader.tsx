import { CircularProgress, Text } from "@chakra-ui/react";
import { Html, useProgress } from "@react-three/drei";
import React from "react";
import { useEffect } from "react";
import theme from "../../@chakra-ui/gatsby-plugin/theme";
import useGlobal from "../../store";
import Progress from "../Progress";

type LoaderProps = {};

const Loader = (props: LoaderProps): JSX.Element => {
  const { active, progress, errors, item, loaded, total } = useProgress();

  return (
    <Html center prepend>
      <Text textAlign="center">Malta tovi, mahtavuutta ladataan</Text>
      <Progress
        value={progress}
        height="50px"
        width="200px"
        containerProps={{
          bg: theme.colors.whiteAlpha[500],
          mb: "5",
          borderRadius: "5px",
        }}
        bg={theme.colors.whiteAlpha[900]}
      />
      <Text textAlign="center">{progress.toFixed(2)}%</Text>
    </Html>
  );
};

export default Loader;
