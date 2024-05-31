import {request} from "@@/exports";

export const borrowBookFormReservations = (params: {
    reservationIds: number[]
}) =>
    request<API.Common.Result<API.Book.Instance>>(`/api/books/borrowing/reservations`, {
        method: "POST",
        data: params.reservationIds,
    });