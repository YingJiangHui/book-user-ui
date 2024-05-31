import React, { memo } from "react";
import classNames from "classnames";

import { Checkbox, CheckboxProps } from "antd-mobile";
import "./BookListCardWithCheckbox.less";

type props = {
  value: any;
};
export type BookListCardWithCheckboxProps = props & CheckboxProps;
export const BookListCardWithCheckbox: React.FC<
  React.PropsWithChildren<BookListCardWithCheckboxProps>
> = memo((props) => {
  const { children, value, ...rest } = props;
  return (
    <div className={classNames("book-list-card__check-able")}>
      <Checkbox {...rest} value={value} />
      {children}
    </div>
  );
});
BookListCardWithCheckbox.displayName = "图书卡片带多选框";
