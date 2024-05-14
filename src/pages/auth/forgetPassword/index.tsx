import React, { memo } from "react";

type props = {};
export type ForgetPasswordPageProps = props;
export const ForgetPasswordPage: React.FC<React.PropsWithChildren<ForgetPasswordPageProps>> =
  memo((props) => {
    return <>忘记密码</>;
  });

export default ForgetPasswordPage
ForgetPasswordPage.displayName = "忘记密码";
