import { Link, Outlet } from "@umijs/max";
import styles from "./index.less";
import { Space } from "antd-mobile";
import { ContentOutline } from "antd-mobile-icons";
import React from "react";
import { usePageTitle } from "@/hooks/usePageTitle";
export default function Layout() {
  const [title, systemName] = usePageTitle();
  return (
    <>
      <Space
        justify={"center"}
        align={"center"}
        direction={"vertical"}
        style={{
          height: "30vh",
          width: "100%",
          color: "var(--adm-color-primary)",
        }}
      >
        {/*<ContentOutline fontSize={50}/>*/}
        <img src={"/book.svg"} height={50} />
        <span
          style={{
            color: "var(--adm-color-text)",
            fontSize: "var(--adm-font-size-10)",
            fontWeight: "bold",
          }}
        >
          {/*  @ts-ignore */}
          {systemName} - {title}
        </span>
      </Space>
      <Outlet />
    </>
  );
}
