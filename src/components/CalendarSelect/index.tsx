import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Button,
  CalendarPickerView,
  CalendarPickerViewProps,
  CalendarPickerViewRef,
  Popup,
} from "antd-mobile";

type props = {
  children?: (value: any) => string;
} & CalendarPickerViewProps;
export type CalendarProps = props;
export const Calendar = forwardRef<{ open: () => void }, CalendarProps>(
  (props, ref) => {
    useImperativeHandle(ref, () => ({
      open: () => {
        setVisible(true);
      },
    }));
    const { children, ...rest } = props;
    const [visible, setVisible] = useState(false);
    return (
      <>
        {typeof children === "function" ? children(props.value) : children}
        <Popup
          onClose={() => setVisible(false)}
          showCloseButton
          visible={visible}
          onMaskClick={() => {
            setVisible(false);
          }}
          bodyStyle={{
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            minHeight: "40vh",
            maxHeight: "60vh",
          }}
        >
          <CalendarPickerView {...rest} />
        </Popup>
      </>
    );
  }
);
Calendar.displayName = "日历选择器";
