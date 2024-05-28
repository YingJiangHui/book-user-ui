import { Dialog, DialogConfirmProps, Toast } from "antd-mobile";

export const confirmToContinue = async (params?: DialogConfirmProps) => {
  return Dialog.confirm({
    cancelText: <div style={{ color: "#1D2129" }}>取消</div>,
    title: "提示",
    ...params,
  }).then((isContinue) => (isContinue ? Promise.resolve() : Promise.reject()));
};

export const checkValueToContinue = (value: any, msg: string = "缺少值") => {
  if (value) {
    return Promise.resolve(null);
  } else {
    Toast.show(msg);
    return Promise.reject(msg);
  }
};
