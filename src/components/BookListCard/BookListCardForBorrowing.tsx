import React, { memo, useMemo } from "react";
import classNames from "classnames";
import { Image, Space, Tag } from "antd-mobile";
import { FallbackBookImage } from "@/components/FallbackBookImage";
import "./index.less";
import dayjs from "dayjs";
import { Constants } from "@/constants";

type props = {
  data: API.Borrowing.Instance;
};
export type BookListCardBorrowingProps = props & React.HTMLAttributes<HTMLDivElement>;
export const BookListCardBorrowing: React.FC<
  React.PropsWithChildren<BookListCardBorrowingProps>
> = memo((props) => {
  const { data, ...rest } = props;
  const { title, files, author, publishedYear, library, isbn } = data.book;
  const statusStatus = useMemo(() => {
    const d = dayjs(data.expectedReturnAt).diff(new Date(), "day");

    switch (data.status) {
      case "RETURNED":
        return { text: `已归还`, color: "success" };
      case "OVERDUE_NOT_RETURNED":
        return { text: `已逾期${Math.abs(d)}天`, color: "danger" };
      case "NOT_RETURNED":
        return {
          text: `${dayjs(data.expectedReturnAt).format(
            "MM月DD日"
          )}闭馆前归还`,
          color: "warning",
        };
      case "OVERDUE_RETURNED":
        return { text: `已归还（逾期归还）`, color: "success" };
    }
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
                color={statusStatus.color}
              >
                {statusStatus.text}
              </Tag>
            }
            {title}
          </Space>
        </h4>
        <p>作者：{author}</p>
        <p>所属图书馆：{library?.name}</p>
        <p>
          借阅日期：
          {dayjs(data.borrowedAt).format("YYYY-MM-DD")} 至{" "}
          {dayjs(data.expectedReturnAt).format("YYYY-MM-DD")}
        </p>
        {data.returnedAt ? (
          <p>
            归还日期：
            {dayjs(data.returnedAt).format("YYYY-MM-DD")}
          </p>
        ) : undefined}
      </div>
    </div>
  );
});
BookListCardBorrowing.displayName = "图书卡片用于预约时";
