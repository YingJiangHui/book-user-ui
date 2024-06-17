import React, { memo } from "react";
import styles from "./myPage.less";
import { Image, Space, Tag } from "antd-mobile";
import avator from "@/assets/avator.svg";
import { useModel, useNavigate } from "@@/exports";
import { Constants } from "@/constants";
import { AaOutline } from "antd-mobile-icons";

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
        </div>
        <div className={styles.body}>
          <div className={styles.item} onClick={() => navigate("/manual")}>
            <div className={styles.title}>用户手册</div>
          </div>
          <div className={styles.item} onClick={() => navigate("/borrowing")}>
            <div className={styles.title}>借阅中</div>
          </div>
          <div className={styles.item} onClick={() => navigate("/reservation")}>
            <div className={styles.title}>预定记录</div>
          </div>
          <div
            className={styles.item}
            onClick={() => navigate("/borrowing/history")}
          >
            <div className={styles.title}>借阅记录</div>
          </div>
          <div
            className={styles.item}
            onClick={() => navigate("/reservation-application")}
          >
            <div className={styles.title}>预约记录</div>
          </div>
        </div>
      </div>
    );
  }
);
MyPage.displayName = "我的";
export default MyPage;
