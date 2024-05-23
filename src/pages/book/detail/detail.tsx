import React, { memo } from "react";

type props = {};
export type BookDetailProps = props;
export const BookDetail: React.FC<React.PropsWithChildren<BookDetailProps>> = memo(props => {
  
  return <>图书详情</>;
});
BookDetail.displayName = "图书详情";

export default BookDetail