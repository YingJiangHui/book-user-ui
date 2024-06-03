import { request } from "@@/exports";

export const getSearchHistory = (params: {
  keyword: string;
  target: "BOOK";
}) => {
  return request<API.Common.Result<API.Search.Instance[]>>(
    "/api/search-history",
    { params, skipErrorHandler: true }
  );
};

export const getSearchHistoryAll = (params: {
  keyword: string;
  target: "BOOK";
}) => {
  return request<API.Common.Result<API.Search.Instance[]>>(
      "/api/search-history/all",
      { params, skipErrorHandler: true }
  );
};
