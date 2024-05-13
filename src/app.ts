// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

import { getBooks } from "@/service/book";
import { getUsers } from "@/service/user";
import { RequestConfig } from "@umijs/max";
import { Toast } from "antd-mobile";
import { storage } from "@/utils/store";

export async function getInitialState(): Promise<{ name: string }> {
  getBooks().then((res) => {
    console.log(res, res);
  });
  getUsers().catch((e) => {
    console.log(e, "e2");
  });
  return { name: "@umijs/max" };
}
export const request: RequestConfig = {
  timeout: 2000,
  // other axios options you want
  errorConfig: {
    errorHandler(error: any, opts) {
      const data = error.response.data as API.Common.Result<unknown>;
      if (opts?.skipErrorHandler) throw error;
      Toast.show(data.message);
      throw error.response.data;
    },
    errorThrower(e) {},
  },
  requestInterceptors: [
    (url, config) => {
      const token = storage.get("token");
      return {
        url: url,
        options: {
          ...config,
          headers: {
            ...config.headers,
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      };
    },
  ],
  responseInterceptors: [],
};
