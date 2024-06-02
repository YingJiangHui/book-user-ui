import React, { memo } from "react";
import { useNavigate, useRequest, useSearchParams } from "@@/exports";
import { getBookShelf, removeBookShelf } from "@/service/bookShelf";
import { BooksInLibraryGroupList } from "@/components/BooksInLibraryGroupList/BooksInLibraryGroupList";
import { Button, Form, Space, Toast } from "antd-mobile";
import { PageActions } from "@/components/PageActions";
import {
  LibraryShelfForm,
  LibraryShelfFormValues,
} from "@/components/FormTemplate/LibraryShelfForm/LibraryShelfForm";
import { confirmToContinue } from "@/utils/feedback";

type props = {};
export type ShelfPageProps = props;
export const ShelfPage: React.FC<React.PropsWithChildren<ShelfPageProps>> =
  memo((props) => {
    const bookShelfReq = useRequest(getBookShelf);
    console.log(bookShelfReq.data, "bookShelfReq");
    const navigate = useNavigate();
    const borrowBook = (values: LibraryShelfFormValues) => {
      navigate({
        pathname: `/books/borrow-confirm`,
        search:
          `from=SHELF&` + values.shelf.map((id) => `bookIds=${id}`).join("&"),
      });
    };
    const reserveBook = (values: LibraryShelfFormValues) => {
      navigate({
        pathname: `/books/reserve-confirm`,
        search:
          `from=SHELF&` + values.shelf.map((id) => `bookIds=${id}`).join("&"),
      });
    };
    const deleteBook = async (ids: number[]) => {
      await confirmToContinue({ content: "确定要删除吗？" });
      await removeBookShelf({ ids });
      Toast.show("已从书架删除");
      bookShelfReq.refresh();
    };
    return (
      <Space direction={"vertical"} style={{ width: "100%" }}>
        {bookShelfReq.data?.map((library) => {
          return (
            <LibraryShelfForm
              onFinish={async (value) => {
                console.log(value, "v");
                if (value.actionType === "BORROW") {
                  borrowBook(value);
                } else {
                  reserveBook(value);
                }
              }}
              onDelete={deleteBook}
              data={library}
            />
          );
        })}
      </Space>
    );
  });
ShelfPage.displayName = "我的书架";
export default ShelfPage;
