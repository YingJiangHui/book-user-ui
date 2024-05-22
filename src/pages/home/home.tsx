import React, { memo } from "react";
import { useRequest } from "@@/exports";
import { getBooks } from "@/service/book";
import { SearchBar } from "antd-mobile";

type props = {};
export type HomeProps = props;
export const Home: React.FC<React.PropsWithChildren<HomeProps>> = memo(
  (props) => {
    const booksReq = useRequest(getBooks);
    console.log(booksReq);
    return (
      <>
        <SearchBar placeholder="请输入内容" />
      </>
    );
  }
);
Home.displayName = "首页";
export default Home;
