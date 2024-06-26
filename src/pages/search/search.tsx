import React, { memo, useEffect, useMemo, useRef } from "react";
import { SearchInput } from "@/components/SearchInput/SearchInput";
import classNames from "classnames";
import styles from "./search.less";
import {
  getSearchHistory,
  getSearchHistoryAll,
  getSearchHistoryHot,
} from "@/service/search";
import { Form, InfiniteScroll } from "antd-mobile";
import { searchBook } from "@/service/book";
import { BookListCard } from "@/components/BookListCard/BookListCard";
import { useNavigate, useRequest } from "@@/exports";
import { useInfiniteScroll } from "ahooks";
import { getBorrowings } from "@/service/borrowing";
import { None } from "@/components/None/None";

type props = {};
export type SearchProps = props;
export const Search: React.FC<React.PropsWithChildren<SearchProps>> = memo(
  (props) => {
    const ref = useRef<{ focus: () => void }>(null);
    useEffect(() => {
      ref.current?.focus();
    }, []);
    const searchHistoryReq = useRequest(getSearchHistory);
    const searchHistoryHotReq = useRequest(getSearchHistoryHot);
    // const searchHistoryReq = useRequest(getSearchHistoryAll);
    const [form] = Form.useForm();
    const searchBookReq = useInfiniteScroll(
      (currentData) => {
        const current = (currentData?.current || 0) + 1;
        const pageSize = currentData?.pageSize || 10;
        return searchBook({
          keyword: form.getFieldValue("keyword") || undefined,
          pageSize: pageSize,
          current: current,
        }).then((item) => ({
          list: item.data.data,
          total: item.data.total,
          pageSize: pageSize,
          current: current,
        }));
      },
      { manual: Boolean(form.getFieldValue("keyword")) }
    );

    const list = useMemo(
      () => searchBookReq.data?.list as API.Book.Instance[] | undefined,
      [searchBookReq.data?.list]
    );
    const navigate = useNavigate();
    return (
      <div className={classNames(styles.searchPage)}>
        <SearchInput
          ref={ref}
          loading={searchBookReq.loading}
          form={form}
          placeholder={"书名、作者、ISBN"}
          onValuesChange={(changedValues, values) => {
            if (!changedValues.keyword) {
              searchBookReq.reload();
            }
          }}
          onFinish={(values) => {
            searchBookReq.reload();
          }}
        />
        <div className={classNames(styles.searchContent)}>
          {list?.length === 0 && form.getFieldValue("keyword") ? (
            <None />
          ) : list?.length ? (
            <div style={{ background: "var(--g-bg-color)", height: "100%" }}>
              {list.map((item) => {
                return (
                  <BookListCard
                    data={item}
                    key={item.id}
                    onClick={() => {
                      navigate(`/books/${item.id}`);
                    }}
                  />
                );
              })}
              <InfiniteScroll
                loadMore={async () => {
                  await searchBookReq.loadMoreAsync();
                }}
                hasMore={
                  typeof searchBookReq.data?.list?.length === "number" &&
                  searchBookReq.data?.total > searchBookReq.data?.list?.length
                }
              />
            </div>
          ) : (
            <div>
              {searchHistoryReq.data?.length ? (
                <div className={classNames(styles.searchHistory)}>
                  <div className={classNames(styles.searchHistoryTitle)}>
                    历史搜索
                  </div>
                  <div className={classNames(styles.searchHistoryItem)}>
                    {searchHistoryReq.data?.map((item) => (
                      <span
                        key={item.keyword}
                        onClick={() => {
                          form.setFieldValue("keyword", item.keyword);
                          form.submit();
                        }}
                      >
                        {item.keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ) : undefined}

              {searchHistoryHotReq.data?.length ? (
                <div className={classNames(styles.searchHistory)}>
                  <div className={classNames(styles.searchHistoryTitle)}>
                    热门搜索
                  </div>
                  <div className={classNames(styles.searchHistoryItem)}>
                    {searchHistoryHotReq.data?.map((item) => (
                      <span
                        key={item.keyword}
                        onClick={() => {
                          form.setFieldValue("keyword", item.keyword);
                          form.submit();
                        }}
                      >
                        {item.keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ) : undefined}
            </div>
          )}
        </div>
      </div>
    );
  }
);
Search.displayName = "图书查询界面";

export default Search;
