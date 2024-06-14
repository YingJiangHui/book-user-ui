import React, { memo } from "react";
import classNames from "classnames";
import styles from "./index.less";
import { RightOutline } from "antd-mobile-icons";
import { useModel, useNavigate, useRequest } from "@@/exports";
import { getBooksByCategory, getCategories } from "@/service/categroy";
import { BookListCard } from "@/components/BookListCard/BookListCard";
import { Grid, Skeleton } from "antd-mobile";
import { PageLoading } from "@/components/PageLoading";

type props = { data: API.Category.Instance };
export type CategoryBooksProps = props;
export const CategoryBooks: React.FC<
  React.PropsWithChildren<CategoryBooksProps>
> = memo((props) => {
  const navigate = useNavigate();
  const { librarySearcher } = useModel("currentLibraryModel");

  const { data } = props;
  useRequest(getCategories);
  const booksByCategoryReq = useRequest(
    () =>
      getBooksByCategory({
        id: data.id,
        firstLibraryId: librarySearcher?.id,
      }),
    {
      loadingDelay: 200,
      cacheKey: `CategoryBooks${data.id}${librarySearcher?.id}`,
      refreshDeps: [data.id, librarySearcher?.id],
    }
  );
  if (booksByCategoryReq.loading) {
    return (
      <>
        <Skeleton.Title animated />
        <Skeleton.Paragraph lineCount={5} animated />
      </>
    );
  }
  if (booksByCategoryReq.data?.length === 0) {
    return undefined;
  }
  return (
    <div>
      <div className={"panel-subheader"}>
        <div className={"panel-subheader__title"}>{data.categoryName}</div>
        <div
          className={"panel-subheader__extra"}
          onClick={() => navigate(`/category?activeKey=${data.id}`)}
        >
          更多
          <RightOutline />
        </div>
      </div>
      <div className={classNames(styles.container)}>
        <Grid columns={3}>
          {booksByCategoryReq.data?.slice(0, 6)?.map((item) => {
            return (
              <Grid.Item key={item.id}>
                <div className={styles["grid-demo-item-block"]}>
                  {
                    <BookListCard
                      onClick={() => navigate(`/books/${item.id}`)}
                      showGaveFieldsOnly
                      direction={"column"}
                      data={{
                        title: item?.title,
                        files: item?.files,
                        author: item?.author,
                      }}
                    />
                  }
                </div>
              </Grid.Item>
            );
          })}
        </Grid>
      </div>
    </div>
  );
});
CategoryBooks.displayName = "图书分类";
