import { Outlet, history } from "@umijs/max";
import styles from "./index.less";
import { FloatingBubble, NavBar, SafeArea, TabBar } from "antd-mobile";
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
import shujia_white from "@/assets/shujia-white.svg";
import {usePageTitle} from "@/hooks/usePageTitle";
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
  const [title] = usePageTitle()
  return (
    <div className={styles.layout}>
      <NavBar
        style={{
          background: "#fff",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
        }}
        onBack={() => navigate(-1)}
      >
        {/*@ts-ignore*/}
        {title}
      </NavBar>
      <main>
        <Outlet />
        <SafeArea position={"bottom"} />
        <FloatingBubble
          onClick={() => {
            navigate("/shelf");
          }}
          style={{
            overflow: "visible",
            "--initial-position-bottom": "18vh",
            "--initial-position-right": "36px",
            "--edge-distance": "24px",
          }}
        >
          <img src={shujia_white} height={28} />
        </FloatingBubble>
      </main>
    </div>
  );
}
