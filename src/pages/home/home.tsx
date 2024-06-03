import React, { memo } from "react";
import { useNavigate, useRequest, useRouteData } from "@@/exports";
import { getBooks } from "@/service/book";
import { SearchBar } from "antd-mobile";
import { SearchInput } from "@/components/SearchInput/SearchInput";

type props = {};
export type HomeProps = props;
export const Home: React.FC<React.PropsWithChildren<HomeProps>> = memo(
  (props) => {
    const booksReq = useRequest(getBooks);
    console.log(booksReq);
    const navigator = useNavigate();
    return (
      <>
        <SearchInput
          onClick={() => {
            navigator("/search");
          }}
          placeholder={"搜索图书"}
        />
      </>
    );
  }
);
Home.displayName = "首页";
export default Home;
