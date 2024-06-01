const ReservationStatusMapToStyle: Record<
  API.Reservation.Instance["status"],
  { text: string; status: string }
> = {
  NOT_BORROWABLE: { text: "未到借阅日期", status: "default" },
  BORROWABLE: { text: "待取书", status: "warning" },
  CANCELLED: { text: "已取消", status: "default" },
  FULFILLED: { text: "已取书", status: "success" },
  EXPIRED: { text: "未按时取书", status: "danger" },
};

const ReservationStatusOption: {
  value: API.Reservation.Instance["status"];
  label: string;
}[] = [
  { value: "BORROWABLE", label: "待取书" },
  { value: "NOT_BORROWABLE", label: "不可借阅" },
  { value: "CANCELLED", label: "已取消" },
  { value: "FULFILLED", label: "已取书" },
  { value: "EXPIRED", label: "逾期未借阅" },
];

export const Reservation = {
  ReservationStatusMapToStyle,
  ReservationStatusOption,
};
