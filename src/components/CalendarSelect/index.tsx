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
  children?: (value: any) => React.ReactNode;
  footer?: React.ReactNode;
} & CalendarPickerViewProps;
export type CalendarProps = props;
export const Calendar = forwardRef<
  { open: () => void; close: () => void },
  CalendarProps
>((props, ref) => {
  useImperativeHandle(ref, () => ({
    open: () => {
      setVisible(true);
    },
    close: () => {
      setVisible(false);
    },
  }));
  const { children, footer, ...rest } = props;
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
          maxHeight: "100vh",
        }}
      >
        <div
          style={{
            // display: "flex",
            // maxHeight: "100vh",
            flexDirection: "column",
          }}
        >
          <div>
            <CalendarPickerView {...rest} />
          </div>
          <div
            style={{
              // flexShrink: 0,
              boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.05)",
            }}
          >
            {footer}
          </div>
        </div>
        {/*<CalendarPickerView {...rest} />*/}
        {/*<div>{footer}</div>*/}
      </Popup>
    </>
  );
});
Calendar.displayName = "日历选择器";
