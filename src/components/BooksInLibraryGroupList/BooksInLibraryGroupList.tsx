import React, { memo } from "react";
import classNames from "classnames";
import { Checkbox, Popover, SwipeAction, Toast } from "antd-mobile";
import { BookListCardWithCheckbox } from "@/components/BookListCardWithCheckbox/BookListCardWithCheckbox";
import "./booksInLibraryGroupList.less";
import { BookListCard } from "@/components/BookListCard/BookListCard";
import { useNavigate } from "@@/exports";
import { bookAuthFeedback } from "@/utils/feedback";

type props = {
  data: API.BookShelf.Instance;
  onChange?: (
    value?: number[],
    record?: API.BookShelf.Instance["books"]
  ) => void;
  value?: number[];
  onDelete?: (id: number) => Promise<void>;
};
export type BooksInLibraryGroupListProps = props;
export const BooksInLibraryGroupList: React.FC<
  React.PropsWithChildren<BooksInLibraryGroupListProps>
> = memo((props) => {
  const { onChange, onDelete, value = [], data } = props;
  const nav = useNavigate();
  return (
    <div className={classNames("books-in-library-group")}>
      <div className={classNames("books-in-library-group__header")}>
        <div className={"books-in-library-group__header__title"}>
          <div className={classNames("books-in-library-group__header_check")}>
            <Checkbox
              indeterminate={
                value && value?.length > 0 && value.length < data.books.length
              }
              checked={value?.length && value?.length === data.books.length}
              onChange={(bool) => {
                if (bool) {
                  const bookIds = data.books
                    .filter((item) => {
                      return !(
                        !item.available ||
                        !!item.borrowing ||
                        !!item.reservation
                      );
                    })
                    .map((book) => book.bookId);
                  if (bookIds.length === 0) {
                    Toast.show("无可选中书籍");
                    return;
                  }
                  onChange?.(bookIds, data.books);
                } else {
                  onChange?.([], []);
                }
              }}
            />
          </div>
          {data.name}
        </div>
      </div>
      {data.books.map((item) => {
        return (
          <SwipeAction
            rightActions={[
              {
                key: "delete",
                text: "删除",
                color: "danger",
                onClick: onDelete?.bind(null, item.bookId),
              },
            ]}
          >
            {" "}
            <BookListCardWithCheckbox
              disabled={
                !item.available || !!item.borrowing || !!item.reservation
              }
              disabledMessage={bookAuthFeedback(item)}
              key={item.bookId}
              checked={value?.includes(item.bookId)}
              onChange={(bool) => {
                if (bool) {
                  //     删除value中指定元素
                  const v = value?.concat(item.bookId);
                  onChange?.(
                    v,
                    data.books.filter((book) => v?.includes(book.bookId))
                  );
                } else {
                  const v = value?.filter((id) => id !== item.bookId);
                  onChange?.(
                    v,
                    data.books.filter((book) => v?.includes(book.bookId))
                  );
                }
              }}
              value={item.id}
            >
              <BookListCard
                data={item}
                onClick={() => nav(`/books/${item.bookId}`)}
              />
            </BookListCardWithCheckbox>
          </SwipeAction>
        );
      })}
    </div>
  );
});
BooksInLibraryGroupList.displayName = "";
