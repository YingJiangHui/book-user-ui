import React, { memo, RefObject, useMemo } from "react";
import { useNavigate, useRequest, useSearchParams } from "@@/exports";
import { getBorrowings, renewBook, returnBook } from "@/service/borrowing";
import { useInfiniteScroll, useUpdate } from "ahooks";
import { BookListCardWithCheckbox } from "@/components/BookListCardWithCheckbox/BookListCardWithCheckbox";
import { BookListCardReservation } from "@/components/BookListCard/BookListCardForReservation";
import { BookListCardBorrowing } from "@/components/BookListCard/BookListCardForBorrowing";
import {
  Button,
  Checkbox,
  DatePickerRef,
  Form,
  InfiniteScroll,
  Space,
  Toast,
} from "antd-mobile";
import { useUserLocationInRange } from "@/hooks/useUserLocationInRange";
import { PageActions } from "@/components/PageActions";
import { Calendar } from "@/components/CalendarSelect";
import dayjs from "dayjs";
import { useLoading } from "@/hooks/useLoading";
import { None } from "@/components/None/None";
const now = new Date();

const pageActionsDescriptionStyle = {
  display: "flex",
  alignItems: "center",
  gap: 8,
};
type props = {};
export type BorrowingProps = props;
export const Borrowing: React.FC<React.PropsWithChildren<BorrowingProps>> =
  memo((props) => {
    const borrowingsReq = useInfiniteScroll((currentData) => {
      const current = (currentData?.current || 0) + 1;
      const pageSize = currentData?.pageSize || 10;
      return getBorrowings({
        status: ["NOT_RETURNED", "OVERDUE_NOT_RETURNED"],
        pageSize: pageSize,
        current: current,
      }).then((item) => ({
        list: item.data.data,
        total: item.data.total,
        pageSize: pageSize,
        current: current,
      }));
    });

    const dataList = useMemo(
      () => borrowingsReq.data?.list as API.Borrowing.Instance[],
      [borrowingsReq.data?.list]
    );
    const getSelected = (selectedIds?: number[]) => {
      return dataList?.filter((item) => selectedIds?.includes(item.id));
    };
    console.log(borrowingsReq);
    const userLocationInRange = useUserLocationInRange();
    const [form] = Form.useForm();
    const calendarRef = React.createRef<DatePickerRef>();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const update = useUpdate();
    const allBorrowingIds = useMemo(
      () => borrowingsReq.data?.list.map((item) => item.id),
      [borrowingsReq.data?.list]
    );
    const [onFinish, loading] = useLoading(async (values) => {
      await returnBook({
        borrowingIds: values.borrowingIds,
      }).then(() => {
        Toast.show("归还成功");
        form.setFieldsValue({ borrowingIds: [] });
        borrowingsReq.reload();
      });
    });

    if (!borrowingsReq.data?.list?.length) {
      return <None />;
    }
    return (
      <Form
        form={form}
        onValuesChange={(changedValues, allValues) => {
          setSearchParams(
            {
              borrowingIds: allValues.borrowingIds,
            },
            { replace: true }
          );
        }}
        initialValues={{
          borrowingIds: searchParams.getAll("borrowingIds")?.map(Number),
        }}
        onFinish={onFinish}
      >
        <div className={"panel-subheader"}>
          <div
            className={"panel-subheader__title"}
            style={{ fontWeight: "normal" }}
          >
            共{borrowingsReq.data.total}条记录
          </div>
        </div>
        <Form.Item noStyle name={"borrowingIds"}>
          <Checkbox.Group>
            {borrowingsReq.data?.list.map((item) => {
              return (
                <BookListCardWithCheckbox value={item.id} key={item.id}>
                  <BookListCardBorrowing
                    data={item}
                    onClick={() => {
                      navigate(`/books/${item.book.id}`);
                    }}
                  />
                </BookListCardWithCheckbox>
              );
            })}
          </Checkbox.Group>
        </Form.Item>
        <InfiniteScroll
          loadMore={async () => {
            await borrowingsReq.loadMoreAsync();
          }}
          hasMore={
            typeof borrowingsReq.data?.list?.length === "number" &&
            borrowingsReq.data?.total > borrowingsReq.data?.list?.length
          }
        />
        <Form.Item noStyle dependencies={["borrowingIds"]}>
          {(form) => {
            const borrowingIds = form.getFieldValue("borrowingIds");
            const selectedBorrowings = getSelected(borrowingIds);

            const libraryMap = selectedBorrowings?.reduce(
              (map, item) => ({
                ...map,
                [item.book.library.id]: item.book.library,
              }),
              {}
            );

            const defaultReturnButtonUI = (
              <>
                <Button
                  disabled
                  color={"primary"}
                  style={{ borderRadius: "0px" }}
                >
                  归还图书
                </Button>
              </>
            );

            const defaultRenewButtonUI = (
              <Button
                disabled
                fill={"outline"}
                color={"primary"}
                style={{ borderRadius: "0px" }}
              >
                续借图书
              </Button>
            );
            console.log(borrowingIds?.length, borrowingsReq.data?.list.length);
            const checkAll = (
              <Checkbox
                indeterminate={
                  borrowingIds &&
                  borrowingsReq.data?.list &&
                  borrowingIds?.length > 0 &&
                  borrowingIds.length < borrowingsReq.data?.list.length
                }
                checked={
                  borrowingIds?.length &&
                  borrowingIds?.length === borrowingsReq.data?.list.length
                }
                onChange={(bool) => {
                  if (bool) {
                    form.setFieldsValue({
                      borrowingIds: allBorrowingIds,
                    });
                    setSearchParams(
                      { borrowingIds: allBorrowingIds as any },
                      { replace: true }
                    );
                    update();
                  } else {
                    form.setFieldsValue({
                      borrowingIds: [],
                    });
                    setSearchParams({ borrowingIds: [] }, { replace: true });
                  }
                }}
              />
            );
            if (Object.keys(libraryMap || {}).length === 0) {
              return (
                <PageActions
                  description={
                    <div style={pageActionsDescriptionStyle}>
                      {checkAll}
                      <span>选择要操作的书籍</span>
                    </div>
                  }
                  actions={[defaultRenewButtonUI, defaultReturnButtonUI]}
                />
              );
            }
            const library = Object.values(
              libraryMap || {}
            )?.[0] as API.Library.Instance;
            if (Object.keys(libraryMap || {}).length > 1) {
              return (
                <PageActions
                  description={
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      {checkAll}
                      <span style={{ whiteSpace: "wrap" }}>
                        只能选择同一图书馆的图书进行操作
                      </span>
                    </div>
                  }
                  actions={[defaultRenewButtonUI, defaultReturnButtonUI]}
                />
              );
            }
            if (userLocationInRange.error) {
              return (
                <PageActions
                  description={
                    <div style={pageActionsDescriptionStyle}>
                      {checkAll}
                      <span>定位获取失败，请设置浏览器定位权限</span>
                    </div>
                  }
                  actions={[defaultRenewButtonUI, defaultReturnButtonUI]}
                />
              );
            }
            const borrowedRange = selectedBorrowings?.reduce(
              (map, item) => ({
                min: map.min
                  ? dayjs(map.min).isBefore(dayjs(item.borrowedAt))
                    ? map.min
                    : item.borrowedAt
                  : item.borrowedAt,
                max: map.max
                  ? dayjs(map.max).isAfter(dayjs(item.borrowedAt))
                    ? map.max
                    : item.borrowedAt
                  : item.borrowedAt,
              }),
              { min: "", max: "" }
            );

            const returnedRange = selectedBorrowings?.reduce(
              (map, item) => ({
                min: map.min
                  ? dayjs(map.min).isBefore(dayjs(item.expectedReturnAt))
                    ? map.min
                    : item.expectedReturnAt
                  : item.expectedReturnAt,
                max: map.max
                  ? dayjs(map.max).isAfter(dayjs(item.expectedReturnAt))
                    ? map.max
                    : item.expectedReturnAt
                  : item.expectedReturnAt,
              }),
              { min: "", max: "" }
            );
            console.log(borrowedRange, returnedRange);
            if (!userLocationInRange.location) {
              return (
                <PageActions
                  description={"定位中..."}
                  actions={[defaultRenewButtonUI, defaultReturnButtonUI]}
                />
              );
            }

            const max = dayjs(borrowedRange.min).add(90, "days").toDate();
            const min = dayjs(returnedRange.max).add(1,'days').toDate();
            const renewBookUI = (
              <Form.Item
                noStyle
                name="expectedReturnAt"
                label="归还日期"
                initialValue={
                  dayjs(min).add(15, "days").isBefore(max)
                    ? dayjs(min).add(15, "days").toDate()
                    : max
                }
              >
                <Calendar
                  footer={
                    <div style={{ padding: 8 }}>
                      <Button
                        block
                        color={"primary"}
                        onClick={() => {
                          const expectedReturnAt =
                            form.getFieldValue("expectedReturnAt");
                          if (!expectedReturnAt) {
                            Toast.show("请选择日期");
                            return;
                          }
                          renewBook({
                            borrowingIds: borrowingIds,
                            expectedReturnAt: expectedReturnAt.toISOString(),
                          }).then(() => {
                            Toast.show("续借成功");
                            form.resetFields();
                            calendarRef.current?.close();
                            borrowingsReq.reload();
                          });
                        }}
                      >
                        确认续借
                      </Button>
                    </div>
                  }
                  title={"归还日期"}
                  allowClear={false}
                  selectionMode={"single"}
                  min={min}
                  max={max}
                  ref={calendarRef}
                >
                  {() => (
                    <Button
                      onClick={() => calendarRef.current?.open()}
                      fill={"outline"}
                      color={"primary"}
                      style={{ borderRadius: "0px" }}
                    >
                      续借图书
                    </Button>
                  )}
                </Calendar>
              </Form.Item>
            );
            if (
              userLocationInRange.inRange(
                library.latitude,
                library.longitude,
                library.circumference
              )
            ) {
              return (
                <PageActions
                  description={
                    <>
                      <div style={pageActionsDescriptionStyle}>
                        {checkAll}
                        <span>
                          共选中<b>{borrowingIds?.length}</b>
                          本图书
                        </span>
                      </div>
                    </>
                  }
                  actions={[
                    renewBookUI,
                    <Button
                      type={"submit"}
                      color={"primary"}
                      style={{ borderRadius: "0px" }}
                      loading={loading}
                    >
                      归还图书
                    </Button>,
                  ]}
                />
              );
            } else {
              return (
                <PageActions
                  description={
                    <div style={pageActionsDescriptionStyle}>
                      {checkAll}
                      <span>定位不在图书馆范围，无法归还</span>
                    </div>
                  }
                  actions={[renewBookUI, defaultReturnButtonUI]}
                />
              );
            }
          }}
        </Form.Item>
      </Form>
    );
  });
Borrowing.displayName = "借阅中";

export default Borrowing;
