import React, { memo } from "react";
import classNames from "classnames";

import { Checkbox, CheckboxProps, Popover } from "antd-mobile";
import "./BookListCardWithCheckbox.less";

type props = {
  value: any;
  disabledMessage?: string;
};
export type BookListCardWithCheckboxProps = props & CheckboxProps;
export const BookListCardWithCheckbox: React.FC<
  React.PropsWithChildren<BookListCardWithCheckboxProps>
> = memo((props) => {
  const { children, disabledMessage, value, ...rest } = props;
  return (
    <div className={classNames("book-list-card__check-able")}>
      {rest.disabled ? (
        <Popover
          trigger="click"
          content={rest.disabled ? disabledMessage : undefined}
        >
          <Checkbox {...rest} value={value} />
        </Popover>
      ) : (
        <Checkbox {...rest} value={value} />
      )}
      {children}
    </div>
  );
});
BookListCardWithCheckbox.displayName = "图书卡片带多选框";
