import { Outlet, history } from "@umijs/max";
import styles from "./index.less";
import { NavBar, TabBar } from "antd-mobile";
import shujia from "../assets/shujia.svg";
import shujia_primary from "../assets/shujia-primary.svg";
import {
  UnorderedListOutline,
  ContentOutline,
  UserOutline,
} from "antd-mobile-icons";
import React from "react";
import {
  matchRoutes,
  useAppData,
  useLocation,
  useNavigate,
  useRouteData,
} from "@@/exports";
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
  const navigate = useNavigate();
  const appData = useAppData();
  const { clientRoutes } = appData;
  const l = useLocation();
  const matches = matchRoutes(clientRoutes, l.pathname);
  return (
    <>
      <NavBar style={{ background: "#fff" }} onBack={() => navigate(-1)}>
        {matches?.[matches?.length - 1]?.route?.name}
      </NavBar>
      <Outlet />
    </>
  );
}
