import React, { memo } from "react";
import classNames from "classnames";
import "./index.less";
import { Image } from "antd-mobile";
import { Constants } from "@/constants";
import image404 from "@/assets/404.svg";
import { FallbackBookImage } from "@/components/FallbackBookImage";

type props = {
  data: Partial<API.Book.Instance>;
  imageWidth?: number;
  showGaveFieldsOnly?: boolean;
  direction?: "column";
  noneBorder?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;
export type BookListCardProps = props;
export const BookListCard: React.FC<
  React.PropsWithChildren<BookListCardProps>
> = memo((props) => {
  const {
    data,
    imageWidth = 80,
    direction,
    showGaveFieldsOnly,
    noneBorder,
    ...rest
  } = props;
  const { title, files, author, publishedYear, library, isbn } = data;
  const fields = [
    { label: "作者", value: author },
    { label: "出版年份", value: publishedYear },
    { label: "ISBN", value: isbn },
    { label: "所属图书馆", value: library?.name },
  ];
  return (
    <div
      className={classNames(
        "book-list-card",
        direction === "column" && "book-list-card-vertical"
      )}
      style={{ border: noneBorder ? "none" : undefined }}
      {...rest}
    >
      <div className="book-list-card__cover">
        <Image
          src={files?.[0]?.url || "none"}
          fallback={<FallbackBookImage width={imageWidth} />}
          alt={title + "封面"}
          width={imageWidth}
          height={imageWidth * 1.46}
        />
      </div>
      <div className="book-list-card__content">
        <h4 className={"book-list-card__title"}>{title}</h4>
        {showGaveFieldsOnly ? (
          <>
            {fields.map((item) => {
              return item.value ? (
                //   溢出隐藏
                <p
                  style={{
                    maxWidth: imageWidth + 32,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.value}
                </p>
              ) : undefined;
            })}
          </>
        ) : (
          <>
            {fields.map((item) => {
              return (
                <p>
                  {item.label}：{item.value || "-"}
                </p>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
});
BookListCard.displayName = "图书列表卡片组件";
