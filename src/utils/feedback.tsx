import { Dialog, DialogConfirmProps, Toast } from "antd-mobile";
import { library } from "@umijs/bundler-webpack/compiled/webpack";

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

export const libraryAuthTextFeedback = (
  library?: API.Library.Instance,
  firstKeys?:
    | (keyof Pick<
        API.Library.Instance,
        "disableReserve" | "disableBorrow" | "disableReserveApplication"
      >)[]
    | keyof Pick<
        API.Library.Instance,
        "disableReserve" | "disableBorrow" | "disableReserveApplication"
      >
) => {
  if (!library) {
    return "";
  }
  if (library?.closed) {
    return "该图书馆已关闭";
  }
  const map = {
    disableReserve: "预订",
    disableBorrow: "借阅",
    disableReserveApplication: "预约",
  };
  if (typeof firstKeys === "string") {
    return `该图书馆关闭了${map[firstKeys]}功能`;
  }

  const filteredKeys = firstKeys?.filter((key) => library[key]);

  if (!filteredKeys?.length) return "";
  return `该图书馆关闭了${filteredKeys.map((key) => map[key]).join("/")}功能`;
};

export const bookAuthFeedback = (book: API.Book.Instance) => {
  if (book.reservation) {
    return "该图书已被预订，进入详情预约图书";
  }
  if (book.borrowing) {
    return "该图书已被借阅，进入详情预约图书";
  }
  if (book.available) {
    return "该图书已下架";
  }
};
