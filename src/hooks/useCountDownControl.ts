import { useCountDown } from "ahooks";
import { useState } from "react";
import { Options } from "ahooks/lib/useCountDown";

export const useCountDownControl = (option: { seconds?: number; onEnd?: Options["onEnd"] }) => {
  const { onEnd, seconds: _seconds = 0 } = option;
  const [second, setSecond] = useState(0);
  const [isWait, setIsWait] = useState(false);
  const [count] = useCountDown({
    leftTime: second * 1000,
    onEnd: () => {
      setSecond(0);
      setIsWait(false);
      onEnd?.();
    }
  });
  const start = () => {
    setIsWait(true);
    setSecond(_seconds);
  };
  return {
    count: Math.floor(count / 1000) + 1,
    start,
    isWait
  };
};
