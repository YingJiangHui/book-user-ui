import { request } from "@umijs/max";

export const getBooks = (params: { ids: (string | number)[] }) =>
  request<API.Common.ResultWithPagination<API.Book.Instance>>("/api/books", {
    params,
  });

export const getBook = (params: { id: string }) =>
  request<API.Common.Result<API.Book.Instance>>(`/api/books/${params.id}`);

export const borrowBook = (params: {
  bookIds: number;
  borrowedAt: string;
  expectedReturnAt: string;
}) =>
  request<API.Common.Result<API.Book.Instance>>(`/api/books/borrowing`, {
    method: "POST",
    data: params,
  });

export const returnBook = (params: { bookIds: number }) => {
  return request<API.Common.Result<API.Book.Instance>>(
    `/api/books/borrowing/return`,
    {
      method: "POST",
      data: params,
    }
  );
};

export const renewBook = (params: { borrowingIds: number[]; days: number }) => {
  return request<API.Common.Result<API.Book.Instance>>(
    `/api/books/borrowing/renew`,
    {
      method: "POST",
      data: params,
    }
  );
};

export const reserveBook = async (params: {
  bookIds: number;
  borrowedAt: string;
  expectedReturnAt: string;
}) => {
  return request<API.Common.Result<API.Book.Instance>>(`/api/books/reservation`, {
    method: "POST",
    data: params,
  });
};
