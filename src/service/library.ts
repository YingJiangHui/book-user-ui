import {request} from "@umijs/max";

export const getLibraries = () =>
    request<API.Common.Result<API.Library.Instance[]>>('/api/library/all', {
        // data: params,
        method: 'GET',
    });
