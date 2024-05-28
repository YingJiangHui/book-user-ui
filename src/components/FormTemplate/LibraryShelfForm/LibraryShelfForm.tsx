import React, { memo } from "react";
import { Button, Form, Toast } from "antd-mobile";
import { BooksInLibraryGroupList } from "@/components/BooksInLibraryGroupList/BooksInLibraryGroupList";
import { PageActions } from "@/components/PageActions";
import { useUserLocationInRange } from "@/hooks/useUserLocationInRange";
import { FormInstance } from "antd-mobile/es/components/form";
import { removeBookShelf } from "@/service/bookShelf";

export type LibraryShelfFormValues = {
  shelf: number[];
  actionType: "BORROW" | "RESERVE";
};

type props = {
  data: API.BookShelf.Instance;
  onFinish: (value: LibraryShelfFormValues) => Promise<void>;
  onDelete?: (ids: number[]) => Promise<void>;
};
export type LibraryShelfFormProps = props;
export const LibraryShelfForm: React.FC<
  React.PropsWithChildren<LibraryShelfFormProps>
> = memo((props) => {
  const { data, onFinish, onDelete } = props;
  const userLocationInRange = useUserLocationInRange(
    data.latitude,
    data.longitude,
    data.longitude
  );

  return (
    <Form
      onFinish={async (value) => {
        await onFinish(value);
      }}
    >
      <Form.Item hidden noStyle name={"actionType"} />
      <Form.Item noStyle name={"shelf"}>
        <BooksInLibraryGroupList data={data} />
      </Form.Item>
      <Form.Item noStyle dependencies={["shelf"]}>
        {(form) => {
          if (userLocationInRange.error) {
            return (
              <PageActions description={"定位获取失败，请设置浏览器定位权限"} />
            );
          }
          if (!userLocationInRange.location) {
            return (
              <PageActions
                shadowed={false}
                position={"relative"}
                description={"定位中..."}
                actions={[
                  <Button
                    color={"primary"}
                    style={{ borderRadius: "0px" }}
                    loading={true}
                  >
                    立即借阅
                  </Button>,
                ]}
              />
            );
          }
          if (userLocationInRange.isInRange) {
            return (
              <PageActions
                shadowed={false}
                position={"relative"}
                description={"定位不在图书馆范围只可进行预约操作"}
                actions={[
                  <Button
                    disabled={!form.getFieldValue("shelf")?.length}
                    color={"danger"}
                    style={{ borderRadius: "0px" }}
                    onClick={async () => {
                      await onDelete?.(form.getFieldValue("shelf"));
                      form.resetFields();
                    }}
                  >
                    删除图书
                  </Button>,
                  <Button
                    disabled={!form.getFieldValue("shelf")?.length}
                    type={"submit"}
                    color={"primary"}
                    style={{ borderRadius: "0px" }}
                    onClick={() => {
                      form.setFieldsValue({ actionType: "BORROW" });
                    }}
                  >
                    立即借阅
                  </Button>,
                ]}
              />
            );
          } else {
            return (
              <PageActions
                shadowed={false}
                position={"relative"}
                description={"定位不在图书馆范围只可进行预约操作"}
                actions={[
                  <Button
                    disabled={!form.getFieldValue("shelf")?.length}
                    color={"danger"}
                    style={{ borderRadius: "0px" }}
                    onClick={async () => {
                      await onDelete?.(form.getFieldValue("shelf"));
                      form.resetFields();
                    }}
                  >
                    删除图书
                  </Button>,
                  <Button
                    disabled={!form.getFieldValue("shelf")?.length}
                    type={"submit"}
                    color={"primary"}
                    style={{ borderRadius: "0px" }}
                    onClick={() => {
                      form.setFieldsValue({ actionType: "RESERVE" });
                    }}
                  >
                    预约图书
                  </Button>,
                ]}
              />
            );
          }
        }}
      </Form.Item>
    </Form>
  );
});
LibraryShelfForm.displayName = "图书馆书架";
