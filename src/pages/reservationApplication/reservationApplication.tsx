import React, { memo } from "react";
import { useNavigate, useRequest } from "@@/exports";
import { getReservations } from "@/service/reservation";
import { useUserLocationInRange } from "@/hooks/useUserLocationInRange";
import { Button, Checkbox, Form, Space, Toast } from "antd-mobile";
import { borrowBookFormReservations } from "@/service/borrowing";
import { BookListCardWithCheckbox } from "@/components/BookListCardWithCheckbox/BookListCardWithCheckbox";
import { BookListCardReservation } from "@/components/BookListCard/BookListCardForReservation";
import { PageActions } from "@/components/PageActions";
import {
  cancelReservationApplication,
  fulfillReservationApplication,
  getReservationBookApplication,
} from "@/service/reservationApplication";
import { BookListCardForReservationApplication } from "@/components/BookListCard/BookListCardForReservationApplication";
import { None } from "@/components/None/None";
import { RightOutline } from "antd-mobile-icons";
import { getSystemSettingsMap } from "@/service/systemSettings";

type props = {};
export type ReservationApplicationProps = props;
export const ReservationApplication: React.FC<
  React.PropsWithChildren<ReservationApplicationProps>
> = memo((props) => {
  const reservationsReq = useRequest(getReservationBookApplication);

  const userLocationInRange = useUserLocationInRange();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  if (!reservationsReq.data?.length) {
    return <None />;
  }
  const systemSettingsMapReq = useRequest(getSystemSettingsMap);

  return (
    <Form
      form={form}
      // onFinish={(values) => {
      //   borrowBookFormReservations({
      //     reservationIds: values.reservationIds,
      //   }).then(() => {
      //     Toast.show("借阅成功");
      //     form.resetFields();
      //     reservationsReq.refresh();
      //   });
      // }}
    >
      <div className={"panel-subheader"}>
        <div
          className={"panel-subheader__title"}
          style={{ fontWeight: "normal" }}
        >
          共{reservationsReq.data?.length}条记录
        </div>
      </div>
      <Form.Item noStyle name={"reservationIds"}>
        <Checkbox.Group
          onChange={(v) => {
            console.log("Checkbox.Group", v);
          }}
        >
          {reservationsReq.data?.map((item) => (
            <BookListCardForReservationApplication
              systemSettingsMapReq={systemSettingsMapReq}
              actions={
                <>
                  {["NOTIFIED", "PENDING"].includes(item.status) ? (
                    <Space>
                      <Button
                        disabled={item.status !== "NOTIFIED"}
                        shape="rounded"
                        color={"primary"}
                        size={"small"}
                        onClick={async (e) => {
                          e.stopPropagation();
                          await fulfillReservationApplication({ id: item.id });
                          Toast.show("取书完成");
                          reservationsReq.refresh();
                        }}
                      >
                        完成取书
                      </Button>
                      <Button
                        shape="rounded"
                        color={"danger"}
                        size={"small"}
                        onClick={async (e) => {
                          e.stopPropagation();
                          await cancelReservationApplication({ id: item.id });
                          Toast.show("取消预约");
                          reservationsReq.refresh();
                        }}
                      >
                        取消预约
                      </Button>
                    </Space>
                  ) : undefined}
                </>
              }
              data={item}
              onClick={() => {
                navigate(`/books/${item.book.id}`);
              }}
            />
          ))}
        </Checkbox.Group>
      </Form.Item>
      {/*<Form.Item noStyle dependencies={["reservationIds"]}>*/}
      {/*  {(form) => {*/}
      {/*    const reservationIds = form.getFieldValue("reservationIds");*/}
      {/*    const selectedReservations = getSelectedReservations(reservationIds);*/}
      {/*    const libraryMap = selectedReservations?.reduce(*/}
      {/*      (map, item) => ({*/}
      {/*        ...map,*/}
      {/*        [item.book.library.id]: item.book.library,*/}
      {/*      }),*/}
      {/*      {}*/}
      {/*    );*/}
      {/*    const defaultUI = (*/}
      {/*      <Button disabled color={"primary"} style={{ borderRadius: "0px" }}>*/}
      {/*        完成取书*/}
      {/*      </Button>*/}
      {/*    );*/}
      {/*    if (Object.keys(libraryMap || {}).length === 0) {*/}
      {/*      return (*/}
      {/*        <PageActions*/}
      {/*          actions={[*/}
      {/*            <Button*/}
      {/*              disabled*/}
      {/*              color={"primary"}*/}
      {/*              style={{ borderRadius: "0px" }}*/}
      {/*            >*/}
      {/*              完成取书*/}
      {/*            </Button>,*/}
      {/*          ]}*/}
      {/*        />*/}
      {/*      );*/}
      {/*    }*/}
      {/*    const library = Object.values(*/}
      {/*      libraryMap || {}*/}
      {/*    )?.[0] as API.Library.Instance;*/}
      {/*    if (Object.keys(libraryMap || {}).length > 1) {*/}
      {/*      return (*/}
      {/*        <PageActions*/}
      {/*          description={"只能选择同一图书馆的图书进行操作"}*/}
      {/*          actions={[defaultUI]}*/}
      {/*        />*/}
      {/*      );*/}
      {/*    }*/}
      {/*    if (userLocationInRange.error) {*/}
      {/*      return (*/}
      {/*        <PageActions*/}
      {/*          description={"定位获取失败，请设置浏览器定位权限"}*/}
      {/*          actions={[defaultUI]}*/}
      {/*        />*/}
      {/*      );*/}
      {/*    }*/}
      {/*    if (!userLocationInRange.location) {*/}
      {/*      return (*/}
      {/*        <PageActions*/}
      {/*          description={"定位中..."}*/}
      {/*          actions={[*/}
      {/*            <Button*/}
      {/*              color={"primary"}*/}
      {/*              style={{ borderRadius: "0px" }}*/}
      {/*              loading={true}*/}
      {/*            >*/}
      {/*              完成取书*/}
      {/*            </Button>,*/}
      {/*          ]}*/}
      {/*        />*/}
      {/*      );*/}
      {/*    }*/}
      {/*    if (*/}
      {/*      userLocationInRange.inRange(*/}
      {/*        library.latitude,*/}
      {/*        library.longitude,*/}
      {/*        library.circumference*/}
      {/*      )*/}
      {/*    ) {*/}
      {/*      return (*/}
      {/*        <PageActions*/}
      {/*          // description={"定位不在图书馆范围只可进行预订操作"}*/}
      {/*          actions={[*/}
      {/*            <Button*/}
      {/*              type={"submit"}*/}
      {/*              color={"primary"}*/}
      {/*              style={{ borderRadius: "0px" }}*/}
      {/*            >*/}
      {/*              完成取书*/}
      {/*            </Button>,*/}
      {/*          ]}*/}
      {/*        />*/}
      {/*      );*/}
      {/*    } else {*/}
      {/*      return (*/}
      {/*        <PageActions*/}
      {/*          description={"定位不在图书馆范围，无法借阅"}*/}
      {/*          actions={[defaultUI]}*/}
      {/*        />*/}
      {/*      );*/}
      {/*    }*/}
      {/*  }}*/}
      {/*</Form.Item>*/}
    </Form>
  );
});
ReservationApplication.displayName = "预约记录";

export default ReservationApplication;
