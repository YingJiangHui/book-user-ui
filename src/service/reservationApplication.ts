import { request } from "@@/exports";

export const reservationBookApply = (params: { bookId: number | string }) => {
  return request("/api/reservation-application", {
    method: "POST",
    data: params,
  });
};

export const getReservationBookApplication = () => {
  return request<API.Common.Result<API.ReservationApplication.Instance[]>>(
    "/api/reservation-application",
    {
      method: "GET",
    }
  );
};

export const fulfillReservationApplication = (params: {
  id: number | string;
}) => {
  return request<API.Common.Result<API.ReservationApplication.Instance[]>>(
    `/api/reservation-application/${params.id}`,
    { method: "POST" }
  );
};
