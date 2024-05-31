import React, { memo } from "react";

type props = {};
export type BorrowingProps = props;
export const Borrowing: React.FC<React.PropsWithChildren<BorrowingProps>> = memo(props => {
  
  return <>借阅中</>;
});
Borrowing.displayName = "借阅中";

export default Borrowing