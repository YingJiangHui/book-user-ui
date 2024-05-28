import React, { memo } from "react";
import classNames from "classnames";
import {
  BookListCard,
  BookListCardProps,
} from "@/components/BookListCard/BookListCard";
import { Checkbox, CheckboxProps } from "antd-mobile";
import "./BookListCardWithCheckbox.less";

type props = {
  checkboxProps?: CheckboxProps;
} & BookListCardProps;
export type BookListCardWithCheckboxProps = props;
export const BookListCardWithCheckbox: React.FC<
  React.PropsWithChildren<BookListCardWithCheckboxProps>
> = memo((props) => {
  const { checkboxProps, ...rest } = props;
  return (
    <div className={classNames("book-list-card__check-able")}>
      <Checkbox {...checkboxProps} key={rest.data.id} value={rest.data.id} />
      <BookListCard {...rest} />
    </div>
  );
});
BookListCardWithCheckbox.displayName = "图书卡片带多选框";
