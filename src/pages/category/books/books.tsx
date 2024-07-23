import React, { memo } from "react";
import { useRequest, history, useModel } from "@@/exports";
import {
  getBooksByCategory,
  getBooksByCategoryPagination,
} from "@/service/categroy";
import { BookListCard } from "@/components/BookListCard/BookListCard";
import styles from "./index.less";
import { useInfiniteScroll } from "ahooks";
import { getBorrowings } from "@/service/borrowing";
import { InfiniteScroll } from "antd-mobile";

type props = {
  categoryId: number;
};
export type BooksListProps = props;
export const BooksList: React.FC<React.PropsWithChildren<BooksListProps>> =
  memo((props) => {
    const { categoryId } = props;
    const { librarySearcher } = useModel("currentLibraryModel");
    const booksByCategoryReq = useInfiniteScroll((currentData) => {
      const current = (currentData?.current || 0) + 1;
      const pageSize = currentData?.pageSize || 10;
      if (!categoryId) return Promise.reject("id is none");
      return getBooksByCategoryPagination({
        id: categoryId,
        firstLibraryId: librarySearcher?.id,
        pageSize: pageSize,
        current: current,
      }).then((item) => ({
        list: item.data.data,
        total: item.data.total,
        pageSize: pageSize,
        current: current,
      }));
    });
    // const booksByCategoryReq = useRequest(
    //   () =>
    //     getBooksByCategory({
    //       id: categoryId,
    //       firstLibraryId: librarySearcher?.id,
    //     }),
    //   {
    //     refreshDeps: [categoryId, librarySearcher?.id],
    //   }
    // );

    return (
      <div className={styles.bookList}>
        {booksByCategoryReq.data?.list?.map((item) => {
          return (
            <BookListCard
              key={item.id}
              data={item}
              onClick={() => history.push(`/books/${item.id}`)}
            />
          );
        })}
        <InfiniteScroll
          loadMore={async () => {
            await booksByCategoryReq.loadMoreAsync();
          }}
          hasMore={
            typeof booksByCategoryReq.data?.list?.length === "number" &&
            booksByCategoryReq.data?.total >
              booksByCategoryReq.data?.list?.length
          }
        />
      </div>
    );
  });
BooksList.displayName = "图书分类";
