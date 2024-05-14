import React, { memo } from "react";
import { useLoading } from "@/hooks/useLoading";
import {postRegister, RegisterReq, resetPassword} from "@/service/auth";
import { Button, Form, Input, Space, Toast } from "antd-mobile";
import { history } from "@@/core/history";
import { useCountDownControl } from "@/hooks/useCountDownControl";
import { sendValidationCodeEmail } from "@/service/email";
import { Link } from "@@/exports";
import { SendValidCodeButton } from "@/components/SendValidCodeButton";

type props = {};
export type ForgetPasswordPageProps = props;
export const ForgetPasswordPage: React.FC<
  React.PropsWithChildren<ForgetPasswordPageProps>
> = memo((props) => {
  const [onFinish, loading] = useLoading(async (values: RegisterReq) => {
    await resetPassword(values);
    Toast.show("密码已重置");
    history.replace({ pathname: "/login" });
  });
  const countDown = useCountDownControl({
    seconds: 60,
    onEnd: () => {
      console.log("end");
    },
  });
  const [form] = Form.useForm<any>();

  const onSendValidCode = async () => {
    const values = await form.validateFields(["email"]);
    await sendValidationCodeEmail({
      email: values.email,
    });
    countDown.start();
  };
  return (
    <Form
      form={form}
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
              <Link to={"/login"}>登录账号</Link>
            </div>
            <div>
              <Link to={"/register"}>注册账号?</Link>
            </div>
          </Space>
          <Button
            loading={loading}
            block
            color="primary"
            type={"submit"}
            size="large"
          >
            重置密码
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
        name={"validationCode"}
        rules={[{ required: true, message: "请填写验证码" }]}
        extra={<SendValidCodeButton {...countDown} onSend={onSendValidCode} />}
      >
        <Input placeholder={"验证码"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请填写登录密码" }]}
      >
        <Input type={"password"} placeholder={"登录密码"} />
      </Form.Item>
      <Form.Item
        name={"passwordConfirmation"}
        rules={[{ required: true, message: "请填写确认密码" }]}
      >
        <Input type={"password"} placeholder={"确认密码"} />
      </Form.Item>
    </Form>
  );
});

export default ForgetPasswordPage;
ForgetPasswordPage.displayName = "忘记密码";
