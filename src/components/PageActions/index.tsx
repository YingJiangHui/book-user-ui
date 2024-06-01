import React, { CSSProperties, memo } from "react";
import classNames from "classnames";
import "./index.less";

type props = {
  actions?: React.ReactNode[];
  description?: React.ReactNode;
  position?: CSSProperties["position"];
  shadowed?: boolean;
  isPlaceholder?: boolean;
};
export type PageActionsProps = props;

export const PageActions: React.FC<React.PropsWithChildren<PageActionsProps>> =
  memo((props) => {
    const {
      shadowed = true,
      isPlaceholder: _isPlaceholder = true,
      actions,
      description,
      position,
    } = props;
    const isPlaceholder = position === "relative" ? false : _isPlaceholder;
    return (
      <>
        {isPlaceholder ? (
          <div className={"page-actions__placeholder"}></div>
        ) : undefined}
        <div
          className={classNames("page-actions")}
          style={{
            position: position,
            ...(shadowed ? {} : { boxShadow: "none" }),
          }}
        >
          <div className={classNames("page-actions__description")}>
            {description}
          </div>
          <div className={classNames("page-actions__action-buttons")}>
            {actions}
          </div>
        </div>
      </>
    );
  });

PageActions.displayName = "界面操作栏目";
