import React, { memo } from "react";
import { useInfiniteScroll } from "ahooks";
import { getBorrowings } from "@/service/borrowing";
import { BookListCardBorrowing } from "@/components/BookListCard/BookListCardForBorrowing";
import { useNavigate } from "@@/exports";
import {InfiniteScroll} from "antd-mobile";

type props = {};
export type BorrowingHistoryProps = props;
export const BorrowingHistory: React.FC<
  React.PropsWithChildren<BorrowingHistoryProps>
> = memo((props) => {
  const borrowingsReq = useInfiniteScroll((currentData) => {
    const current = (currentData?.current || 0) + 1;
    const pageSize = currentData?.pageSize || 10;
    return getBorrowings({
      status: ["RETURNED", "OVERDUE_RETURNED"],
      pageSize: pageSize,
      current: current,
    }).then((item) => ({
      list: item.data.data,
      total: item.data.total,
      pageSize: pageSize,
      current: current,
    }));
  });
  const navigate = useNavigate();
  return (
    <>
      {borrowingsReq.data?.list.map((item) => {
        return (
          <BookListCardBorrowing
            onClick={() => {
              navigate(`/books/${item.book.id}`);
            }}
            data={item}
            key={item.id}
          />
        );
      })}
      <InfiniteScroll
          loadMore={async () => {
            await borrowingsReq.loadMoreAsync();
          }}
          hasMore={
              typeof borrowingsReq.data?.list?.length === "number" &&
              borrowingsReq.data?.total > borrowingsReq.data?.list?.length
          }
      />
    </>
  );
});
BorrowingHistory.displayName = "借阅历史";

export default BorrowingHistory;
