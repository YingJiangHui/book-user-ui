import {
  history,
  Link,
  matchRoutes,
  Outlet,
  useAppData,
  useLocation,
  useModel,
  useNavigate,
  useRequest,
  useRouteData,
} from "@@/exports";
import styles from "@/layouts/index.less";
import { NavBar, TabBar } from "antd-mobile";
import React, { useEffect, useMemo } from "react";
import {
  ContentOutline,
  LocationFill,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";
import shujia_primary from "@/assets/shujia-primary.svg";
import shujia from "@/assets/shujia.svg";
import { useUserLocationInRange } from "@/hooks/useUserLocationInRange";
import { getLibraries } from "@/service/library";
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
  const [title] = usePageTitle();


  const { library, selectedLibrary, locationService, librariesReq } =
    useModel("currentLibraryModel") || {};

  const displayLibrary = useMemo(() => {
    if (selectedLibrary) {
      return selectedLibrary.name;
    }
    if (locationService?.location && librariesReq?.data) {
      if (library?.id) {
        return library.name;
      } else {
        return "";
      }
    }

    return "未在图书馆范围";
  }, [selectedLibrary, library, locationService?.location, librariesReq?.data]);

  return (
    <div className={styles.layout}>
      <NavBar
        style={{
          background: "#fff",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
        }}
        backArrow={false}
        right={
          <Link style={{ color: "#333" }} to={"/libraries-map"}>
            {displayLibrary}
            <LocationFill color={"red"} />
          </Link>
        }
      >
        {title}
      </NavBar>
      <main className={styles.main}>
        <Outlet />
      </main>
      <TabBar
        style={{
          boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.05)",
          background: "#fff",
        }}
        activeKey={location.pathname?.split("/")?.filter(Boolean)?.[0]}
        // defaultActiveKey={location.pathname?.split("/")?.filter(Boolean)?.[0]}
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
