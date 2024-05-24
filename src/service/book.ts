import { request } from "@umijs/max";

export const getBooks = () =>
  request("/api/books", {
    params: { id: 1 },
  });

export const getBook = (params: { id: string }) => request<API.Common.Result<API.Book.Instance>>(`/api/books/${params.id}`);
