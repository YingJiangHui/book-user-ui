import React, { memo, useState } from "react";
import { DatePicker, List, Toast } from "antd-mobile";

type props = {};
export type borrowConfirmProps = props;
const now = new Date();
export const reserveConfirm: React.FC<
  React.PropsWithChildren<borrowConfirmProps>
> = memo((props) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <List>
        <List.Item extra="预约日期" onClick={() => setVisible(true)}>
          请选择预约日期
        </List.Item>
      </List>
      {
        <DatePicker
          title="时间选择"
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          max={now}
          onConfirm={(val) => {
            console.log(val);
            Toast.show(val.toDateString());
          }}
        />
      }
    </>
  );
});
reserveConfirm.displayName = "确认预约";

export default reserveConfirm;
