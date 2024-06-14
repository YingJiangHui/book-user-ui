import { request } from "@umijs/max";

export const getAllCategories = () => {
  return request<API.Common.Result<API.Category.Instance[]>>(
    "/api/categories/all"
  );
};

export const getCategories = (
  params?: API.Common.ParamsWithPagination<{ firstLibraryId?: number }>
) => {
  return request<API.Common.ResultWithPagination<API.Category.Instance>>(
    "/api/categories",
    {
      params,
    }
  );
};

export const createCategory = (params: API.Category.CreationParams) => {
  return request<API.Common.Result<API.Category.Instance>>("/api/categories", {
    data: params,
    method: "POST",
  });
};

export const getBooksByCategory = (params: {
  id: number;
  firstLibraryId?: number;
}) => {
  return request<API.Common.Result<API.Book.Instance[]>>(
    `api/categories/${params.id}/books`,
    { params: { firstLibraryId: params.firstLibraryId } }
  );
};

export const getBooksByCategoryPagination = (
  params: API.Common.ParamsWithPagination<{
    id: number;
    firstLibraryId?: number;
  }>
) => {
  const { id, ...rest } = params;
  return request<API.Common.ResultWithPagination<API.Book.Instance[]>>(
    `api/categories/${id}/books/pagination`,
    { params: rest }
  );
};
