import React, { memo, useEffect, useState } from "react";
import { SideBar } from "antd-mobile";
import { useRequest, useSearchParams } from "@@/exports";
import { getAllCategories, getCategories } from "@/service/categroy";
import styles from "./index.less";
import classNames from "classnames";
import { BooksList } from "@/pages/category/books/books";

export const tabs = [
  {
    key: "key1",
    title: "选项一",
  },
  {
    key: "key2",
    title: "选项二",
  },
  {
    key: "key3",
    title: "选项三",
  },
];
type props = {};
export type CategoryPageProps = props;
export const CategoryPage: React.FC<
  React.PropsWithChildren<CategoryPageProps>
> = memo((props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoriesReq = useRequest(getAllCategories, {
    onSuccess: (res) => {
      setSearchParams({ activeKey: res?.[0]?.id.toString() });
    },
  });
  return (
    <div className={styles.container}>
      <div className={styles.side}>
        <SideBar
          activeKey={searchParams.get("activeKey")}
          onChange={(key) => {
            setSearchParams({ activeKey: key });
          }}
        >
          {categoriesReq.data
            ?.map((item) => ({ key: item.id, title: item.categoryName }))
            .map((item) => (
              <SideBar.Item key={item.key} title={item.title} />
            ))}
        </SideBar>
      </div>
      <div className={classNames(styles.content)}>
        <BooksList categoryId={Number(searchParams.get("activeKey"))} />
      </div>
    </div>
  );
});
CategoryPage.displayName = "分类展示界面";
export default CategoryPage;
