import {
  history,
  matchRoutes,
  Outlet,
  useAppData,
  useLocation,
  useNavigate,
  useRouteData,
} from "@@/exports";
import styles from "@/layouts/index.less";
import { NavBar, TabBar } from "antd-mobile";
import React from "react";
import {
  ContentOutline,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";
import shujia_primary from "@/assets/shujia-primary.svg";
import shujia from "@/assets/shujia.svg";
const tabs = [
  {
    key: "home",
    title: "首页",
    icon: <ContentOutline />,
  },
  {
    key: "category",
    title: "分类",
    icon: <UnorderedListOutline />,
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
    icon: <UserOutline />,
  },
];
export default function Layout() {
  const appData = useAppData();
  const navigate = useNavigate();

  const { clientRoutes } = appData;
  const l = useLocation();
  const matches = matchRoutes(clientRoutes, l.pathname);
  return (
    <div className={styles.layout}>
      <NavBar style={{ background: "#fff" }} backArrow={false}>
        {matches?.[matches?.length - 1]?.route?.name}
      </NavBar>
      <main>
        <Outlet />
      </main>
      <TabBar
        defaultActiveKey={location.pathname?.split("/")?.filter(Boolean)?.[0]}
        onChange={(key) => history.replace("/" + key)}
        safeArea
      >
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
}