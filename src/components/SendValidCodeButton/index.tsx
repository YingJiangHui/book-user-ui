import React, { memo, useState } from "react";
import { Button, Loading } from "antd-mobile";
import { useLoading } from "@/hooks/useLoading";

type props = { count: number; onSend: () => Promise<void>; isWait: boolean };
export type SendValidCodeButtonProps = props;
export const SendValidCodeButton: React.FC<React.PropsWithChildren<SendValidCodeButtonProps>> = memo(props => {
  const { count, isWait, onSend: _onSendValidCode } = props;
  const [isSent, setIsSent] = useState(false);

  const [onSendValidCode, loading] = useLoading(async () => {
    await _onSendValidCode();
    setIsSent(true);
  });
  if (loading)
    return (
      <Button style={{ padding: 0, color: "#C9CDD4" }} color="primary" fill="none">
        发送中
        <Loading style={{ fontSize: 14, color: "#C9CDD4" }} />
      </Button>
    );
  return isWait ? (
    <Button style={{ padding: 0, color: "#C9CDD4" }} color="primary" fill="none">
      {count}s后重新发送
    </Button>
  ) : (
    <Button style={{ padding: 0 }} color="primary" fill="none" onClick={onSendValidCode}>
      {isSent ? "重新发送" : "发送验证码"}
    </Button>
  );
});
SendValidCodeButton.displayName = "发送验证码按钮";
