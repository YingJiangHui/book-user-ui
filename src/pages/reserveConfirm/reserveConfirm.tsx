import React, { memo, RefObject, useMemo, useState } from "react";
import {
  Button,
  DatePicker,
  DatePickerRef,
  Form,
  List,
  Toast,
} from "antd-mobile";
import { useNavigate, useRouteData, useSearchParams } from "@@/exports";
import { useRequest } from "ahooks";
import { borrowBook, getBooks, reserveBook } from "@/service/book";
import { PageLoading } from "@/components/PageLoading";
import dayjs from "dayjs";
import { Calendar } from "@/components/CalendarSelect";
import { BookListCard } from "@/components/BookListCard/BookListCard";

type props = {};
export type borrowConfirmProps = props;
const now = new Date();
const maxDate = dayjs().add(2, "months").toDate();
export const reserveConfirm: React.FC<
  React.PropsWithChildren<borrowConfirmProps>
> = memo((props) => {
  const [searchParams] = useSearchParams();
  const startTime = dayjs(searchParams.get("startTime") || now);
  const endTime = startTime.add(40, "day");
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
        const [borrowedAt, expectedReturnAt] = value.reserveRange;
        await reserveBook({
          bookIds: value.ids,
          borrowedAt: borrowedAt.toISOString(),
          expectedReturnAt: dayjs(expectedReturnAt).endOf("day").toISOString(),
          from: searchParams.get("from") || undefined,
        });
        Toast.show({ icon: "success", content: "预约成功" });
        navigate(-1);
      }}
      footer={
        <Button block type="submit" color="primary" size="large">
          确认预约
        </Button>
      }
    >
      <Form.Item
        name="reserveRange"
        label="预约时间段"
        // trigger="onConfirm"
        initialValue={[startTime, endTime]}
        onClick={(e, datePickerRef: RefObject<DatePickerRef>) => {
          datePickerRef.current?.open();
        }}
        rules={[{ required: true, message: "请选择日期" }]}
      >
        <Calendar
          allowClear={false}
          selectionMode={"range"}
          min={startTime.toDate()}
          max={maxDate}
        >
          {(value) =>
            value
              ? `${dayjs(value[0]).format("YYYY-MM-DD")} 至 ${dayjs(
                  value[1]
                ).format("YYYY-MM-DD")}（闭馆前）`
              : "请选择日期"
          }
        </Calendar>
      </Form.Item>
      <Form.Item label="借阅天数" dependencies={["reserveRange"]}>
        {(form) => {
          console.log(form.getFieldValue("reserveRange"));
          const range = form.getFieldValue("reserveRange");
          const days = dayjs(range[1]).diff(range[0], "days");
          return days + "天";
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
reserveConfirm.displayName = "确认预约";

export default reserveConfirm;
