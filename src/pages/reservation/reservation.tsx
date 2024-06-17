import React, { memo } from "react";
import { useNavigate, useRequest } from "@@/exports";
import { getReservations } from "@/service/reservation";
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

    return (
      <Form
        form={form}
        onFinish={(values) => {
          borrowBookFormReservations({
            reservationIds: values.reservationIds,
          }).then(() => {
            Toast.show("借阅成功");
            form.resetFields();
            reservationsReq.refresh();
          });
        }}
      >
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
              return (
                <PageActions
                  actions={[
                    <Button
                      disabled
                      color={"primary"}
                      style={{ borderRadius: "0px" }}
                    >
                      完成取书
                    </Button>,
                  ]}
                />
              );
            }
            const library = Object.values(
              libraryMap || {}
            )?.[0] as API.Library.Instance;
            if (Object.keys(libraryMap || {}).length > 1) {
              return (
                <PageActions
                  description={"只能选择同一图书馆的图书进行操作"}
                  actions={[defaultUI]}
                />
              );
            }
            if (userLocationInRange.error) {
              return (
                <PageActions
                  description={"定位获取失败，请设置浏览器定位权限"}
                  actions={[defaultUI]}
                />
              );
            }
            if (!userLocationInRange.location) {
              return (
                <PageActions
                  description={"定位中..."}
                  actions={[
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
                      type={"submit"}
                      color={"primary"}
                      style={{ borderRadius: "0px" }}
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
                  actions={[defaultUI]}
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
