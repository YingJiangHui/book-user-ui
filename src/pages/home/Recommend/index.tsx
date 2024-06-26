import React, { memo } from "react";
import { useModel, useNavigate, useRequest } from "@@/exports";
import { getBooks } from "@/service/book";
import classNames from "classnames";
import styles from "./index.less";
import { List } from "antd-mobile";
import { BookListCard } from "@/components/BookListCard/BookListCard";
import { delay } from "@/utils/utils";

type props = {};
export type RecommendBooksProps = props;
export const RecommendBooks: React.FC<
  React.PropsWithChildren<RecommendBooksProps>
> = memo((props) => {
  const { librarySearcher } = useModel("currentLibraryModel");
  const navigate = useNavigate();
  const recommendBooksReq = useRequest(
    () =>
      delay(300).then(() =>
        getBooks({
          current: 1,
          pageSize: 5,
          isRecommend: true,
          firstLibraryId: librarySearcher?.id,
        })
      ),
    {
      refreshDeps: [librarySearcher?.id],
    }
  );
  const books = recommendBooksReq.data?.data;
  const oneBook = books?.[0];
  const twoBook = books?.[1];
  const threeBook = books?.[2];
  if (!books?.length) return <></>;
  return (
    <div>
      <div className={"panel-subheader"}>
        <div className={"panel-subheader__title"}>推荐书籍</div>
        <div className={"panel-subheader__extra"}></div>
      </div>
      <div className={classNames(styles.container)}>
        <div className={classNames(styles.left)}>
          <BookListCard
            onClick={() => {
              navigate(`/books/${oneBook?.id}`);
            }}
            showGaveFieldsOnly
            direction={"column"}
            data={{
              title: oneBook?.title,
              files: oneBook?.files,
              author: oneBook?.author,
            }}
          />
        </div>
        <div className={classNames(styles.right)}>
          <div className={classNames(styles.top)}>
            {twoBook ? (
              <BookListCard
                onClick={() => {
                  navigate(`/books/${twoBook?.id}`);
                }}
                noneBorder
                imageWidth={50}
                showGaveFieldsOnly
                data={{
                  title: twoBook?.title,
                  files: twoBook?.files,
                  author: twoBook?.author,
                }}
              />
            ) : undefined}
          </div>
          <div className={classNames(styles.bottom)}>
            {threeBook ? (
              <BookListCard
                onClick={() => {
                  navigate(`/books/${threeBook?.id}`);
                }}
                noneBorder
                imageWidth={50}
                showGaveFieldsOnly
                data={{
                  title: threeBook?.title,
                  files: threeBook?.files,
                  author: threeBook?.author,
                }}
              />
            ) : undefined}
          </div>
        </div>
      </div>
    </div>
  );
});
RecommendBooks.displayName = "图书推荐";
