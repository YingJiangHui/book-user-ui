import React, { memo } from "react";
import { useNavigate, useRequest } from "@@/exports";
import { cancelReservations, getReservations } from "@/service/reservation";
import { BookListCardWithCheckbox } from "@/components/BookListCardWithCheckbox/BookListCardWithCheckbox";
import { BookListCard } from "@/components/BookListCard/BookListCard";
import { BookListCardReservation } from "@/components/BookListCard/BookListCardForReservation";
import { PageActions } from "@/components/PageActions";
import { Button, Checkbox, Form, Toast } from "antd-mobile";
import { useUserLocationInRange } from "@/hooks/useUserLocationInRange";
import dayjs from "dayjs";
import { confirmToContinue } from "@/utils/feedback";
import { borrowBook } from "@/service/book";
import { borrowBookFormReservations } from "@/service/borrowing";
import { useLoading } from "@/hooks/useLoading";
import { None } from "@/components/None/None";

type props = {};
export type ReservationProps = props;
export const Reservation: React.FC<React.PropsWithChildren<ReservationProps>> =
  memo((props) => {
    const reservationsReq = useRequest(getReservations);
    const getSelectedReservations = (selectedIds?: number[]) => {
      return reservationsReq.data?.filter((item) =>
        selectedIds?.includes(item.id)
      );
    };
    const userLocationInRange = useUserLocationInRange();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [cancelReserve, cancelLoading] = useLoading(async () => {
      await cancelReservations({ ids: form.getFieldValue("reservationIds") });
      Toast.show("取消成功");
      form.resetFields();
      reservationsReq.refresh();
    });
    const [finishReserve, finishLoading] = useLoading(async (values) => {
      await borrowBookFormReservations({
        reservationIds: values.reservationIds,
      }).then(() => {
        Toast.show("借阅成功");
        form.resetFields();
        reservationsReq.refresh();
      });
    });
    const actionLoading = finishLoading || cancelLoading;
    if (!reservationsReq.data?.length) {
      return <None />;
    }

    return (
      <Form
        form={form}
        onFinish={async (values) => {
          await borrowBookFormReservations({
            reservationIds: values.reservationIds,
          }).then(() => {
            Toast.show("借阅成功");
            form.resetFields();
            reservationsReq.refresh();
          });
        }}
      >
        <div className={"panel-subheader"}>
          <div
            className={"panel-subheader__title"}
            style={{ fontWeight: "normal" }}
          >
            共{reservationsReq.data.length}条记录
          </div>
        </div>
        <Form.Item noStyle name={"reservationIds"}>
          <Checkbox.Group
            onChange={(v) => {
              console.log("Checkbox.Group", v);
            }}
          >
            {reservationsReq.data?.map((item) => (
              <BookListCardWithCheckbox
                disabled={item.status !== "BORROWABLE"}
                value={item.id}
                key={item.id}
              >
                <BookListCardReservation
                  data={item}
                  onClick={() => {
                    navigate(`/books/${item.book.id}`);
                  }}
                />
              </BookListCardWithCheckbox>
            ))}
          </Checkbox.Group>
        </Form.Item>
        <Form.Item noStyle dependencies={["reservationIds"]}>
          {(form) => {
            const reservationIds = form.getFieldValue("reservationIds");
            const selectedReservations =
              getSelectedReservations(reservationIds);
            const libraryMap = selectedReservations?.reduce(
              (map, item) => ({
                ...map,
                [item.book.library.id]: item.book.library,
              }),
              {}
            );
            const cancelUI = (
              <Button disabled color={"danger"} style={{ borderRadius: "0px" }}>
                取消预订
              </Button>
            );
            const defaultUI = (
              <Button
                disabled
                color={"primary"}
                style={{ borderRadius: "0px" }}
              >
                完成取书
              </Button>
            );
            if (Object.keys(libraryMap || {}).length === 0) {
              return <PageActions actions={[cancelUI, defaultUI]} />;
            }
            const library = Object.values(
              libraryMap || {}
            )?.[0] as API.Library.Instance;
            if (Object.keys(libraryMap || {}).length > 1) {
              return (
                <PageActions
                  description={"只能选择同一图书馆的图书进行操作"}
                  actions={[cancelUI, defaultUI]}
                />
              );
            }
            if (userLocationInRange.error) {
              return (
                <PageActions
                  description={"定位获取失败，请设置浏览器定位权限"}
                  actions={[
                    <Button
                      color={"danger"}
                      style={{ borderRadius: "0px" }}
                      onClick={cancelReserve}
                      loading={actionLoading}
                    >
                      取消预订
                    </Button>,
                    defaultUI,
                  ]}
                />
              );
            }
            if (!userLocationInRange.location) {
              return (
                <PageActions
                  description={"定位中..."}
                  actions={[
                    <Button
                      color={"danger"}
                      style={{ borderRadius: "0px" }}
                      loading={true}
                    >
                      取消预订
                    </Button>,
                    <Button
                      color={"primary"}
                      style={{ borderRadius: "0px" }}
                      loading={true}
                    >
                      完成取书
                    </Button>,
                  ]}
                />
              );
            }
            if (
              userLocationInRange.inRange(
                library.latitude,
                library.longitude,
                library.circumference
              )
            ) {
              return (
                <PageActions
                  // description={"定位不在图书馆范围只可进行预订操作"}
                  actions={[
                    <Button
                      color={"danger"}
                      style={{ borderRadius: "0px" }}
                      onClick={cancelReserve}
                      loading={actionLoading}
                    >
                      取消预订
                    </Button>,
                    <Button
                      type={"submit"}
                      color={"primary"}
                      style={{ borderRadius: "0px" }}
                      loading={actionLoading}
                    >
                      完成取书
                    </Button>,
                  ]}
                />
              );
            } else {
              return (
                <PageActions
                  description={"定位不在图书馆范围，无法借阅"}
                  actions={[
                    <Button
                      color={"danger"}
                      style={{ borderRadius: "0px" }}
                      onClick={cancelReserve}
                      loading={actionLoading}
                    >
                      取消预订
                    </Button>,
                    defaultUI,
                  ]}
                />
              );
            }
          }}
        </Form.Item>
      </Form>
    );
  });
Reservation.displayName = "预订记录";

export default Reservation;
