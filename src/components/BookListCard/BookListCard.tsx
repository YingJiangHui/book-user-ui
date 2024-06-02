import React, { memo } from "react";
import classNames from "classnames";
import "./index.less";
import { Image } from "antd-mobile";
import { Constants } from "@/constants";
import image404 from "@/assets/404.svg";
import { FallbackBookImage } from "@/components/FallbackBookImage";

type props = { data: API.Book.Instance } & React.HTMLAttributes<HTMLDivElement>;
export type BookListCardProps = props;
export const BookListCard: React.FC<
  React.PropsWithChildren<BookListCardProps>
> = memo((props) => {
  const { data, ...rest } = props;
  const { title, files, author, publishedYear, library, isbn } = data;
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
        <h4 className={"book-list-card__title"}>{title}</h4>
        <p>作者：{author}</p>
        <p>出版年份：{publishedYear}</p>
        <p>ISBN：{isbn}</p>
        <p>所属图书馆：{library?.name}</p>
      </div>
    </div>
  );
});
BookListCard.displayName = "图书列表卡片组件";
