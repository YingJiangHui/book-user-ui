import { request } from "@umijs/max";

export const getBooks = (
  params: API.Common.ParamsWithPagination<
    Partial<
      { ids: (string | number)[]; firstLibraryId: number } & API.Book.Instance
    >
  >
) =>
  request<API.Common.ResultWithPagination<API.Book.Instance>>("/api/books", {
    params,
  });

export const getBook = (params: { id: string }) =>
  request<API.Common.Result<API.Book.Instance>>(`/api/books/${params.id}`);

export const borrowBook = (params: {
  bookIds: number;
  borrowedAt: string;
  expectedReturnAt: string;
  from?: string;
}) =>
  request<API.Common.Result<API.Book.Instance>>(`/api/books/borrowing`, {
    method: "POST",
    data: params,
  });

export const reserveBook = async (params: {
  bookIds: number;
  borrowedAt: string;
  expectedReturnAt: string;
  from?: string;
}) => {
  return request<API.Common.Result<API.Book.Instance>>(
    `/api/books/reservation`,
    {
      method: "POST",
      data: params,
    }
  );
};

export const searchBook = async (
  params: API.Common.ParamsWithPagination<{ keyword: number }>
) => {
  return request<API.Common.ResultWithPagination<API.Book.Instance>>(
    `/api/books/search`,
    {
      method: "GET",
      params,
    }
  );
};
