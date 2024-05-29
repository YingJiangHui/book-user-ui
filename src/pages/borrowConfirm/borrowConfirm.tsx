import React, { memo, RefObject, useMemo } from "react";
import {
  Button,
  DatePicker,
  DatePickerRef,
  Form,
  List,
  Toast,
} from "antd-mobile";
import { SelectDate } from "@/components/FormFields/SelectDate";
import dayjs from "dayjs";
import { useRequest } from "ahooks";
import { borrowBook, getBooks } from "@/service/book";
import { history, useNavigate, useSearchParams } from "@@/exports";
import { BookListCard } from "@/components/BookListCard/BookListCard";
import { PageLoading } from "@/components/PageLoading";
import { Calendar } from "@/components/CalendarSelect";

type props = {};
export type borrowConfirmProps = props;
const now = new Date();
const defaultDate = dayjs().add(40, "day").toDate();
const maxDate = dayjs().add(2, "months").toDate();

export const borrowConfirm: React.FC<
  React.PropsWithChildren<borrowConfirmProps>
> = memo((props) => {
  const [searchParams] = useSearchParams();
  console.log(searchParams.getAll("bookIds"), 'searchParams.get("bookIds")');
  const booksReq = useRequest(getBooks, {
    defaultParams: [{ ids: searchParams.getAll("bookIds") }],
  });
  const navigate = useNavigate();

  if (booksReq.loading) {
    return <PageLoading />;
  }
  return (
    <Form
      // style={{ background: "#fff" }}
      onFinish={async (value) => {
        await borrowBook({
          bookIds: value.ids,
          borrowedAt: new Date().toISOString(),
          expectedReturnAt: dayjs(value.expectedReturnAt)
            .endOf("day")
            .toISOString(),
          from: searchParams.get("from") || undefined,
        });
        Toast.show({ icon: "success", content: "预约成功" });
        navigate(-1);
      }}
      footer={
        <Button block type="submit" color="primary" size="large">
          确认借阅
        </Button>
      }
    >
      <Form.Item
        name="expectedReturnAt"
        label="归还日期"
        // trigger="onConfirm"
        initialValue={defaultDate}
        onClick={(e, datePickerRef: RefObject<DatePickerRef>) => {
          datePickerRef.current?.open();
        }}
        rules={[{ required: true, message: "请选择日期" }]}
      >
        <Calendar
          allowClear={false}
          selectionMode={"single"}
          min={now}
          max={maxDate}
        >
          {(value) =>
            value ? dayjs(value).format("YYYY-MM-DD") + " 闭馆前" : "请选择日期"
          }
        </Calendar>
      </Form.Item>
      <Form.Item label="借阅天数" dependencies={["expectedReturnAt"]}>
        {(form) => {
          console.log(form.getFieldValue("expectedReturnAt"));
          const days = dayjs(form.getFieldValue("expectedReturnAt")).diff(
            dayjs(new Date()),
            "days"
          );
          return days + 1 + "天";
        }}
      </Form.Item>
      <Form.Item
        noStyle
        hidden
        name={"ids"}
        initialValue={searchParams.getAll("bookIds")}
      />
      <div
        style={{
          background: "var(--g-bg-color)",
        }}
      >
        <div className={"adm-list-header"}>
          共 <b>{booksReq.data?.data?.data.length}</b> 本
        </div>
        {booksReq.data?.data?.data?.map((item) => {
          return (
            <BookListCard
              key={item.id}
              data={item}
              // onClick={() => history.push(`/books/${item.id}`)}
            />
          );
        })}
      </div>
    </Form>
  );
});
borrowConfirm.displayName = "借阅确认";

export default borrowConfirm;
