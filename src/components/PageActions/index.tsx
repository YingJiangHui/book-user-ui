import React, { memo } from "react";
import classNames from "classnames";
import "./index.less";

type props = {
  actions: React.ReactNode[];
  description: React.ReactNode;
};
export type PageActionsProps = props;

export const PageActions: React.FC<React.PropsWithChildren<PageActionsProps>> =
  memo((props) => {
    const { actions, description } = props;
    return (
      <div className={classNames("page-actions")}>
        <div className={classNames("page-actions__description")}>
          {description}
        </div>
        <div className={classNames("page-actions__action-buttons")}>
          {actions}
        </div>
      </div>
    );
  });

PageActions.displayName = "界面操作栏目";
