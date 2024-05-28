import { request } from "@@/exports";

export const getBookShelf = () => {
  return request<API.Common.Result<API.BookShelf.Instance[]>>("/api/book-shelf");
};

export const removeBookShelf = (params: { ids: (number | string)[] }) => {
  return request("/api/book-shelf", {
    method: "DELETE",
    data: params.ids,
  });
};

export const addBookShelf = (params: { bookId: (number | string) }) => {
  return request("/api/book-shelf", {
    method: "POST",
    data: params,
  });
};
