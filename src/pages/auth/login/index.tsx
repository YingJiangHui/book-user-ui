import React, { memo } from "react";
import { Button, Form, Input, Space, Toast } from "antd-mobile";
import { Link, history, useSearchParams } from "@@/exports";
import {
    LoginReq,
    postLogin,
    resetPassword,
    resetPasswordReq,
} from "@/service/auth";
import { useLoading } from "@/hooks/useLoading";
import { useModel } from "@@/plugin-model";
import {storage} from "@/utils/store";

type props = {};
export type LoginPageProps = props;
export const LoginPage: React.FC<React.PropsWithChildren<LoginPageProps>> =
  memo((props) => {
    const [searchParams] = useSearchParams();

      const initialState = useModel('@@initialState');
    const [onFinish, loading] = useLoading(async (values: LoginReq) => {
        console.log(values);
        const res = await postLogin(values);
        Toast.show("登录成功");
        storage.set('token', res.data);
        await initialState.refresh();
        const redirectTo = searchParams.get('redirectTo');
        history.replace({ pathname: redirectTo ? redirectTo : '/' });
    });
    return (
      <>
        <Form
          onFinish={onFinish}
          footer={
            <div style={{ marginTop: -8 }}>
              <Space
                justify={"between"}
                style={{
                  width: "100%",
                  background: "var(--g-bg-color)",
                  marginBottom: 24,
                }}
              >
                <div>
                  <Link to={"/register"}>注册账号</Link>
                </div>
                <div>
                  <Link to={"/forget-password"}>忘记密码?</Link>
                </div>
              </Space>
              <Button
                loading={loading}
                block
                color="primary"
                type={"submit"}
                size="large"
              >
                登录
              </Button>
            </div>
          }
        >
          <Form.Item
            name={"email"}
            rules={[{ required: true, message: "请填写电子邮箱" }]}
          >
            <Input placeholder={"电子邮箱"} />
          </Form.Item>
          <Form.Item
            name={"password"}
            rules={[{ required: true, message: "请填写登录密码" }]}
          >
            <Input type={"password"} placeholder={"登录密码"} />
          </Form.Item>
        </Form>
      </>
    );
  });

export default LoginPage;
LoginPage.displayName = "登录页面";
