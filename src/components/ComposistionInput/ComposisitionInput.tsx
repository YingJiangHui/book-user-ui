import React, {
  ChangeEventHandler,
  memo,
  useCallback,
  useRef,
  useState,
} from "react";
import { Input, InputProps } from "antd-mobile";

type props = {};
export type CompositionInputProps = props & InputProps;
export const CompositionInput: React.FC<
  React.PropsWithChildren<CompositionInputProps>
> = memo((props) => {
  const { onChange, defaultValue, value: outerValue, ...rest } = props;
  const lockRef = useRef(false);
  const [value, setValue] = useState(defaultValue);

  const _onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      console.log("e", e, e.type, lockRef.current);
      if (e.type === "compositionstart") {
        lockRef.current = true;
        return;
      }
      if (typeof e === "string") setValue(e);
      if (e.type === "compositionend") {
        lockRef.current = false;
        return onChange?.(e.target.value);
      }

      if (lockRef.current) return;
      return onChange?.(e);
    },
    [onChange]
  );
  return (
    <Input
      autoComplete={"off"}
      {...rest}
      onCompositionStart={_onChange as any}
      onCompositionEnd={_onChange as any}
      onChange={_onChange as any}
      value={lockRef.current ? value : outerValue}
    />
  );
});
CompositionInput.displayName = "CompositionInput";
