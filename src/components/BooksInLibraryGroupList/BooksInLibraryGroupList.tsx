import React, { memo } from "react";
import classNames from "classnames";
import { Checkbox } from "antd-mobile";
import { BookListCardWithCheckbox } from "@/components/BookListCardWithCheckbox/BookListCardWithCheckbox";
import "./booksInLibraryGroupList.less";

type props = {
  data: API.BookShelf.Instance;
  onChange?: (
    value?: number[],
    record?: API.BookShelf.Instance["books"]
  ) => void;
  value?: number[];
};
export type BooksInLibraryGroupListProps = props;
export const BooksInLibraryGroupList: React.FC<
  React.PropsWithChildren<BooksInLibraryGroupListProps>
> = memo((props) => {
  const { onChange, value = [], data } = props;
  return (
    <div className={classNames("books-in-library-group")}>
      <div className={classNames("books-in-library-group__header")}>
        <div className={"books-in-library-group__header__title"}>
          <div className={classNames("books-in-library-group__header_check")}>
            <Checkbox
              indeterminate={
                value && value?.length > 0 && value.length < data.books.length
              }
              checked={value?.length === data.books.length}
              onChange={(bool) => {
                console.log(
                  "value",
                  bool,
                  data.books.map((book) => book.id),
                  data.books
                );
                if (bool) {
                  onChange?.(
                    data.books.map((book) => book.id),
                    data.books
                  );
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
          <BookListCardWithCheckbox
            checkboxProps={{
              checked: value?.includes(item.id),
              onChange: (bool) => {
                if (bool) {
                  //     删除value中指定元素
                  const v = value?.concat(item.id);
                  console.log(v, "v", bool);
                  onChange?.(
                    v,
                    data.books.filter((book) => v?.includes(book.id))
                  );
                } else {
                  const v = value?.filter((id) => id !== item.id);
                  console.log(v, "v", bool);
                  onChange?.(
                    v,
                    data.books.filter((book) => v?.includes(book.id))
                  );
                }
              },
            }}
            data={item}
          />
        );
      })}
    </div>
  );
});
BooksInLibraryGroupList.displayName = "";
