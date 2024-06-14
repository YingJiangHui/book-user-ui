import React, { memo } from "react";
import { useModel, useNavigate, useRequest } from "@@/exports";
import { getCategories } from "@/service/categroy";
import classNames from "classnames";
import { BookListCard } from "@/components/BookListCard/BookListCard";
import styles from "./CategoryBooks/index.less";
import { CategoryBooks } from "@/pages/home/Categories/CategoryBooks";
import { Space } from "antd-mobile";

type props = {};
export type CategoriesBooksProps = props;
export const CategoriesBooks: React.FC<
  React.PropsWithChildren<CategoriesBooksProps>
> = memo((props) => {
  const { librarySearcher } = useModel("currentLibraryModel");

  const categoriesReq = useRequest(
    () =>
      getCategories({
        current: 1,
        pageSize: 5,
        firstLibraryId: librarySearcher?.id,
      }),
    {
      cacheKey: "CategoriesBooks",
      loadingDelay: 200,
      refreshDeps: [librarySearcher?.id],
    }
  );
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "var(--gap)" }}
    >
      {categoriesReq.data?.data.map((category) => {
        return <CategoryBooks key={category.id} data={category} />;
      })}
    </div>
  );
});
CategoriesBooks.displayName = "图书分类";
