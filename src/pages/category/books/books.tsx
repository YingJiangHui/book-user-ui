import React, { memo } from "react";
import { useRequest } from "@@/exports";
import { getBooks } from "@/service/book";
import { getBooksByCategory } from "@/service/categroy";

type props = {
  categoryId: number;
};
export type BooksListProps = props;
export const BooksList: React.FC<React.PropsWithChildren<BooksListProps>> =
  memo((props) => {
    const { categoryId } = props;
    useRequest(getBooksByCategory, { defaultParams: [{ id: categoryId }] });

    return <>图书分类</>;
  });
BooksList.displayName = "图书分类";
