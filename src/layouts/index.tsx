import { Outlet, history } from "@umijs/max";
import styles from "./index.less";
import { TabBar } from "antd-mobile";
import shujia from "../assets/shujia.svg";
import shujia_primary from "../assets/shujia-primary.svg";
import {
  UnorderedListOutline,
  ContentOutline,
  UserOutline,
} from "antd-mobile-icons";
import React from "react";
import {useLocation} from "@@/exports";
const tabs = [
  {
    key: "home",
    title: "首页",
    icon: <ContentOutline />
  },
  {
    key: "category",
    title: "分类",
    icon: <UnorderedListOutline />
  },
  {
    key: "shelf",
    title: "书架",
    icon: (active: boolean) => {
      return active ? (
        <img src={shujia_primary} height={20} />
      ) : (
        <img src={shujia} height={20} />
      );
    },
  },
  {
    key: "my-page",
    title: "我的",
    icon: <UserOutline />
  },
];
export default function Layout() {
  const location = useLocation()
  return (
    <div className={styles.layout}>
      <main>
        <Outlet />
      </main>
      <TabBar defaultActiveKey={location.pathname?.split("/")?.filter(Boolean)?.[0]} onChange={(key)=>history.replace("/"+key)} safeArea>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
}
