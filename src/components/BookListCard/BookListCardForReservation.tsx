import React, { memo, useMemo } from "react";
import classNames from "classnames";
import { Image, Space, Tag } from "antd-mobile";
import { FallbackBookImage } from "@/components/FallbackBookImage";
import "./index.less";
import dayjs from "dayjs";
import { Constants } from "@/constants";

type props = {
  data: API.Reservation.Instance;
};
export type BookListCardReservationProps = props &
  React.HTMLAttributes<HTMLDivElement>;
export const BookListCardReservation: React.FC<
  React.PropsWithChildren<BookListCardReservationProps>
> = memo((props) => {
  const { data, ...rest } = props;
  const { title, files, author, publishedYear, library, isbn } = data.book;
  const diffDisplay = useMemo(() => {
    const d = dayjs(data.borrowedAt).diff(new Date(), "day");

    switch (data.status) {
      case "BORROWABLE":
        return `请在${dayjs(data.borrowedAt)
          .add(3, "days")
          .format("MM月DD日")}闭馆前取书`;
      case "NOT_BORROWABLE":
        return `${d}天后可取书`;
      case "CANCELLED":
        break;
      case "FULFILLED":
        break;
      case "EXPIRED":
        break;
    }
    return Constants.Reservation.ReservationStatusMapToStyle[data.status].text;
  }, [data.borrowedAt, data.status]);
  return (
    <div className={classNames("book-list-card")} {...rest}>
      <div className="book-list-card__cover">
        <Image
          src={files?.[0]?.url || "none"}
          fallback={<FallbackBookImage />}
          alt={title + "封面"}
          width={80}
        />
      </div>
      <div className="book-list-card__content">
        <h4 className={"book-list-card__title"}>
          <Space direction={"vertical"}>
            {
              <Tag
                style={{ padding: "3px 6px" }}
                round
                color={
                  Constants.Reservation.ReservationStatusMapToStyle[data.status]
                    .status
                }
              >
                {diffDisplay}
              </Tag>
            }
            {title}
          </Space>
        </h4>
        <p>作者：{author}</p>
        <p>所属图书馆：{library?.name}</p>
        <p>
          预约时间：
          {dayjs(data.borrowedAt).format("YYYY-MM-DD")} 至{" "}
          {dayjs(data.returnedAt).format("YYYY-MM-DD")}
        </p>
      </div>
    </div>
  );
});
BookListCardReservation.displayName = "图书卡片用于预约时";
