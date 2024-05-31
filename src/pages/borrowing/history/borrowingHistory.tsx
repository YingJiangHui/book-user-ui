import React, { memo } from "react";

type props = {};
export type BorrowingHistoryProps = props;
export const BorrowingHistory: React.FC<React.PropsWithChildren<BorrowingHistoryProps>> = memo(props => {

  return <>借阅历史</>;
});
BorrowingHistory.displayName = "借阅历史";

export default BorrowingHistory;