import React, { memo } from "react";
import { useRequest, history } from "@@/exports";
import { getBooksByCategory } from "@/service/categroy";
import { BookListCard } from "@/components/BookListCard/BookListCard";
import styles from "./index.less";

type props = {
  categoryId: number;
};
export type BooksListProps = props;
export const BooksList: React.FC<React.PropsWithChildren<BooksListProps>> =
  memo((props) => {
    const { categoryId } = props;
    const booksByCategoryReq = useRequest(
      () => getBooksByCategory({ id: categoryId }),
      {
        refreshDeps: [categoryId],
      }
    );
    console.log(booksByCategoryReq, "booksByCategoryReq");

    return (
      <div className={styles.bookList}>
        {booksByCategoryReq.data?.map((item) => {
          return <BookListCard key={item.id} data={item} onClick={() => history.push(`/books/${item.id}`)} />;
        })}
      </div>
    );
  });
BooksList.displayName = "图书分类";
