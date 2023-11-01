"use client";

import React from "react";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import type Entity from "@ant-design/cssinjs/es/Cache";
import { useServerInsertedHTML } from "next/navigation";
import { ConfigProvider } from "antd";
import { Nunito } from "next/font/google";

const font = Nunito({
  subsets: ["latin"],
});

console.log(font, "font");

const StyledComponentsRegistry = ({ children }: React.PropsWithChildren) => {
  const cache = React.useMemo<Entity>(() => createCache(), []);
  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ));
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: font.style.fontFamily,
          fontWeightStrong: 700,
        },
      }}
    >
      {" "}
      <StyleProvider cache={cache}>{children}</StyleProvider>
    </ConfigProvider>
  );
};

export default StyledComponentsRegistry;
