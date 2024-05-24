import React, { memo, ReactNode } from "react";
import classNames from "classnames";
import "./description.less"

type props = {
  options: API.Common.Option[];
};
export type DescriptionsProps = props;
export const Descriptions: React.FC<
  React.PropsWithChildren<DescriptionsProps>
> = memo((props) => {
  return <div className={classNames("description-list")}>
    {props.options.map((option) => (
      <div key={option.value} className={classNames("description-item")}>
        <div className={classNames("description-label")}>{option.label}</div>
        <div className={classNames("description-value")}>{option.value}</div>
      </div>
    ))}
  </div>;
});
Descriptions.displayName = "描述列表";
