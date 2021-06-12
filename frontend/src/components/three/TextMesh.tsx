import { MeshProps } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { forwardRef } from "react";
import * as THREE from "three";
import useFont from "../../hooks/useFont";

type TextMeshProps = MeshProps & {
  text: string;
  fontUrl?: string;
  textOptions?: Omit<THREE.TextGeometryParameters, "font">;
};

const TextMesh = forwardRef<THREE.Mesh, TextMeshProps>(
  (
    {
      text,
      fontUrl = "/fonts/Disket-Mono-Regular.ttf",
      textOptions: customTextOptions,
      ...meshProps
    },
    ref
  ): JSX.Element | null => {
    // try {
    const [font, setFont] = useState<THREE.Font>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (!font && !loading && typeof window !== "undefined") {
        setLoading(true);
        useFont({ url: fontUrl })
          .then(font => {
            setFont(font);
          })
          .finally(() => setLoading(false));
      }
    }, [font, loading]);

    if (!font) return null;

    const defaultTextOptions: THREE.TextGeometryParameters = {
      font,
      size: 1,
      height: 1,
    };

    const textOptions: THREE.TextGeometryParameters = {
      ...defaultTextOptions,
      ...customTextOptions,
    };

    return (
      <mesh ref={ref} {...meshProps}>
        <textGeometry attach="geometry" args={[text, textOptions]} />
        <meshStandardMaterial attach="material" />
      </mesh>
    );
  }
);

export default TextMesh;
