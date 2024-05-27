import React, { memo, useMemo, useState } from "react";
import { DatePicker, DatePickerProps, List, Toast } from "antd-mobile";
import dayjs from "dayjs";

type props = {
  placeholder?: string;
  onChange?: (value: Date) => void;
  value?: Date;
} & DatePickerProps;
export type SelectDateProps = props;
export const SelectDate: React.FC<React.PropsWithChildren<SelectDateProps>> =
  memo((props) => {
    const { onChange, placeholder, value, ...rest } = props;
    const [visible, setVisible] = useState(false);

    return (
      <>
        <List>
          <List.Item
            extra={useMemo(
              () => (value ? dayjs(value).format("YYYY-MM-DD") : placeholder),
              [value, placeholder]
            )}
            onClick={() => setVisible(true)}
          >
            归还日期
          </List.Item>
        </List>
        {
          <DatePicker
            title="时间选择"
            visible={visible}
            onClose={() => {
              setVisible(false);
            }}
            {...rest}
            value={value}
            onConfirm={(val) => {
              onChange?.(val);
            }}
          />
        }
      </>
    );
  });
SelectDate.displayName = "选择日期";
