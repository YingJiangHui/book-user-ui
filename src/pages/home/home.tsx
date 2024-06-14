import React, { memo } from "react";
import { useModel, useNavigate, useRequest, useRouteData } from "@@/exports";
import { getBooks } from "@/service/book";
import { Image, SearchBar, Space, Swiper } from "antd-mobile";
import { SearchInput } from "@/components/SearchInput/SearchInput";
import { getCategories } from "@/service/categroy";
import { FallbackBookImage } from "@/components/FallbackBookImage";
import { HomeBanner } from "@/pages/home/Banner";
import { RecommendBooks } from "@/pages/home/Recommend";
import { CategoriesBooks } from "@/pages/home/Categories";

type props = {};
export type HomeProps = props;
export const Home: React.FC<React.PropsWithChildren<HomeProps>> = memo(
  (props) => {
    const { librarySearcher } = useModel("currentLibraryModel");
    const navigator = useNavigate();

    return (
      <div style={{ paddingBottom: 12 }}>
        <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
          <SearchInput
            onlyDisplay
            onClick={() => {
              navigator("/search");
            }}
            placeholder={"搜索图书"}
          />
        </div>
        <Space direction={"vertical"} style={{ width: "100%" }}>
          <HomeBanner />
          <RecommendBooks />
          <CategoriesBooks />
        </Space>
      </div>
    );
  }
);
Home.displayName = "首页";
export default Home;
