import React, { memo, useMemo } from "react";
import classNames from "classnames";
import { Button, Divider, Image, Space, Tag, Toast } from "antd-mobile";
import { FallbackBookImage } from "@/components/FallbackBookImage";
import "./index.less";
import dayjs from "dayjs";
import { Constants } from "@/constants";
import { fulfillReservationApplication } from "@/service/reservationApplication";
import { useNavigate, useRequest } from "@@/exports";
import { getSystemSettingsMap } from "@/service/systemSettings";

type props = {
  data: API.ReservationApplication.Instance;
  actions?: React.ReactNode;
  systemSettingsMapReq: any;
};
export type BookListCardReservationProps = props &
  React.HTMLAttributes<HTMLDivElement>;
export const BookListCardForReservationApplication: React.FC<
  React.PropsWithChildren<BookListCardReservationProps>
> = memo((props) => {
  const { data, systemSettingsMapReq, actions, ...rest } = props;
  const nav = useNavigate();
  const { title, files, author, publishedYear, library, isbn } = data.book;

  const diffDisplay = useMemo(() => {
    switch (data.status) {
      case "NOTIFIED":
        return systemSettingsMapReq.data?.GET_BOOK_DAYS
          ? `请在${
              systemSettingsMapReq.data?.GET_BOOK_DAYS
                ? dayjs(data.createdAt)
                    .add(systemSettingsMapReq.data?.GET_BOOK_DAYS, "days")
                    .format("MM月DD日")
                : ""
            }闭馆前取书`
          : undefined;
    }

    return Constants.ReservationApplication
      .ReservationApplicationStatusMapToStyle[data.status].text;
  }, [data.status, systemSettingsMapReq.data?.GET_BOOK_DAYS]);
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
                  Constants.ReservationApplication
                    .ReservationApplicationStatusMapToStyle[data.status].status
                }
              >
                {diffDisplay}
              </Tag>
            }
            {title}
          </Space>
        </h4>
        <p>所属图书馆：{library?.name}</p>
        <p>创建时间：{dayjs(data?.createdAt).format("YYYY-MM-DD")}</p>
        <div>{actions}</div>
      </div>
    </div>
  );
});
BookListCardForReservationApplication.displayName = "图书卡片用于预订时";
