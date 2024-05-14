import { Link, Outlet } from "@umijs/max";
import styles from "./index.less";
import { Space } from "antd-mobile";
import { ContentOutline } from "antd-mobile-icons";
import React from "react";
export default function Layout() {
  return (
    <>
      <Space
        justify={"center"}
        align={"center"}
        style={{
          height: "30vh",
          width: "100%",
          color: "var(--adm-color-primary)",
        }}
      >
        <ContentOutline fontSize={50} />
      </Space>
      <Outlet />
    </>
  );
}
