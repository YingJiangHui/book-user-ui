// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

import { getBooks } from "@/service/book";
import { getUserInfo, getUsers } from "@/service/user";
import { RequestConfig } from "@umijs/max";
import { Space, Toast } from "antd-mobile";
import { storage } from "@/utils/store";
import { stringify } from "qs";
import { toLogin } from "@/utils/helpers";
import React from "react";

const defaultInitialState: System.InitialState = { name: "自助图书借阅平台" };

export async function getInitialState(): Promise<System.InitialState> {
  const token = storage.get("token");
  // if (!token) {
  //   toLogin();
  //   return defaultInitialState;
  // }
  const res = await getUserInfo().catch(() => {
    // toLogin();
    return null;
  });

  return { ...defaultInitialState, user: res?.data, token };
}

export const request: RequestConfig = {
  paramsSerializer: (params) => stringify(params, { arrayFormat: "brackets" }),
  timeout: 2000,
  // other axios options you want
  errorConfig: {
    errorHandler(error: any, opts) {
      console.log(error, "error");
      const data = error?.response?.data as
        | API.Common.Result<unknown>
        | undefined;
      if (opts?.skipErrorHandler) throw error;
      const statusMap: Record<number, () => any> = {
        401: () => (
          <Space>
            {data?.message}
            <a onClick={toLogin}>立即登录</a>
          </Space>
        ),
        403: () => (
          <Space>
            {data?.message}
            <a onClick={toLogin}>切换账号</a>
          </Space>
        ),
      };
      const result = statusMap[error?.response?.status as number]?.();
      if (
        error?.response?.status === 401 &&
        window.location.pathname === "/login"
      ) {
        throw error.response.data;
      }
      if (React.isValidElement(result)) {
        Toast.show({
          content: result,
        });
      } else {
        Toast.show({
          content: data?.message,
        });
      }

      throw error?.response?.data;
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
};
