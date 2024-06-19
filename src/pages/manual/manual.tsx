import React, { memo } from "react";
import { useRequest } from "@@/exports";
import { getSystemSettingsMap } from "@/service/systemSettings";
import classNames from "classnames";
import styles from "./index.less";

type props = {};
export type ManualProps = props;
export const Manual: React.FC<React.PropsWithChildren<ManualProps>> = memo(
  (props) => {
    const systemSettings = useRequest(getSystemSettingsMap);

    return (
      <div className={classNames(styles.page)}>
        <h2>用户手册</h2>
        <h3>切换图书馆</h3>
        <p>
          用户可以通过右上角的按钮切换图书馆，系统会优先展示用户所切换到的图书馆。
        </p>
        <h3>借阅规则</h3>
        <p>
          用户必须要处在图书馆范围内才可以通过手机访问本应用进行图书的借阅。当用户不在图书馆访问时可以通过
          <b>预订</b>
          功能预先锁定图书，并在指定的时间内到相应图书馆完成取书操作。
        </p>
        <p>
          如果图书已经被其他用户借阅，用户可以通过图书详情的预约功能对图书进行
          <b>预约</b>
          ，当被预约的图书归还图书馆时，系统会已邮件的形式通知用户到馆取书。
        </p>
        <h3>预订和预约</h3>
        <h4>预订</h4>
        <p>
          预订功能适用于用户当前不在图书馆范围时对图书提前锁定，需要指定借阅时间和归还时间。
        </p>
        <h4>预约</h4>
        <p>
          预约功能是在图书被其他用户借阅时，用户通过已排队的方式等待该图书的归还，一本图书可以被多次预约，系统会按照预约的时序，对预约图书的用户进行电子邮件通知。取书后默认借阅
          <b>{systemSettings.data?.DEFAULT_BORROW_DAYS}</b>天。
        </p>
        <h3>违约问题</h3>
        <p>
          一个账号逾期归还图书超过
          <b>{systemSettings.data?.MAX_OVERDUE_TIMES}</b>
          次系统将锁定该账号，需要用户到图书馆联系管理员，处理违约问题后解锁。解锁不再有宽限逾期机会，每次逾期都会锁定账号。同时系统提供了续借功能可不在图书馆范围内完成续借操作。
        </p>
      </div>
    );
  }
);
Manual.displayName = "用户手册";

export default Manual;
