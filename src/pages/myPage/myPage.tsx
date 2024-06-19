import React, { memo } from "react";
import styles from "./myPage.less";
import { Image, Space, Tag } from "antd-mobile";
import avator from "@/assets/avator.svg";
import { useModel, useNavigate } from "@@/exports";
import { Constants } from "@/constants";
import { logoutUser } from "@/service/auth";
import { toLogin } from "@/utils/helpers";
import manual from "@/assets/domain/manual.svg";
import borrowing from "@/assets/domain/borrow.svg";
import reservation from "@/assets/domain/reserve.svg";
import history from "@/assets/domain/history.svg";
import reservationApplication from "@/assets/domain/reserve-application.svg";

type props = {};
export type MyPageProps = props;
export const MyPage: React.FC<React.PropsWithChildren<MyPageProps>> = memo(
  (props) => {
    const globalModel = useModel("@@initialState");
    const navigate = useNavigate();
    return (
      <div className={styles.myPage}>
        <div className={styles.header}>
          <Image src={avator} width={60}></Image>
          {globalModel.initialState.user ? (
            <Space
              direction={"vertical"}
              style={{ "--gap": "3px" }}
              className={styles.info}
            >
              <div className={styles.tags}>
                <Space>
                  {globalModel.initialState?.user?.roles.map((role) => (
                    <Tag style={{ padding: 5 }} round color="primary">
                      {Constants.User.UserRoleMapToText[role]}
                    </Tag>
                  ))}
                </Space>
              </div>
              <div className={styles.name}>
                {globalModel.initialState?.user?.email}
              </div>
            </Space>
          ) : (
            "未登录"
          )}
        </div>
        <div className={styles.body}>
          <div className={styles.item} onClick={() => navigate("/borrowing")}>
            <img src={borrowing} height={28} />
            <div className={styles.title}>借阅中</div>
          </div>
          <div className={styles.item} onClick={() => navigate("/reservation")}>
            <img src={reservation} height={28} />
            <div className={styles.title}>预订记录</div>
          </div>
          <div
            className={styles.item}
            onClick={() => navigate("/reservation-application")}
          >
            <img src={reservationApplication} height={28} />
            <div className={styles.title}>预约记录</div>
          </div>
          <div
            className={styles.item}
            onClick={() => navigate("/borrowing/history")}
          >
            <img src={history} height={28} />
            <div className={styles.title}>借阅记录</div>
          </div>

          <div className={styles.item} onClick={() => navigate("/manual")}>
            <img src={manual} height={28} />
            <div className={styles.title}>用户手册</div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "15%",
            transform: "translateX(-50%)",
          }}
        >
          {globalModel.initialState?.user ? (
            <a
              style={{ color: "#888" }}
              onClick={() => {
                logoutUser().then(() => {
                  globalModel.refresh();
                  toLogin();
                });
              }}
            >
              退出登录
            </a>
          ) : (
            <a
              style={{ color: "#888" }}
              onClick={() => {
                toLogin();
              }}
            >
              登录账号
            </a>
          )}
        </div>
      </div>
    );
  }
);
MyPage.displayName = "我的";
export default MyPage;
