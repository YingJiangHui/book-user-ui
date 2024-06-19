import React, { memo, useCallback, useMemo, useState } from "react";
import { useNavigate, useParams, useRequest } from "@@/exports";
import { getBook } from "@/service/book";
import {
  Button,
  Image,
  ImageViewer,
  List,
  Space,
  Swiper,
  Toast,
} from "antd-mobile";
import { FallbackBookImage } from "@/components/FallbackBookImage";
import styles from "./index.less";
import { Descriptions } from "@/components/Descriptions/description";
import { PageActions } from "@/components/PageActions";
import { useUserLocationInRange } from "@/hooks/useUserLocationInRange";
import { addBookShelf } from "@/service/bookShelf";
import { reservationBookApply } from "@/service/reservationApplication";
import { libraryAuthTextFeedback } from "@/utils/feedback";
type props = {};
export type BookDetailProps = props;
export const BookDetail: React.FC<React.PropsWithChildren<BookDetailProps>> =
  memo((props) => {
    const params = useParams<{ id: string }>();
    console.log(params.id);
    const bookReq = useRequest(getBook, {
      defaultParams: [{ id: params.id! }],
    });
    const userLocationInRange = useUserLocationInRange(
      bookReq.data?.library.latitude,
      bookReq.data?.library.longitude,
      bookReq.data?.library.longitude
    );
    const navigate = useNavigate();
    const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
    const ActionUI = useMemo(() => {
      const addBookToBookList = () => {
        addBookShelf({ bookId: params.id! }).then(() => {
          Toast.show("已书架成功");
        });
      };
      const borrowBook = () => {
        navigate({
          pathname: `/books/borrow-confirm`,
          search: `bookIds=${params.id}`,
        });
      };
      const reserveBook = () => {
        navigate({
          pathname: `/books/reserve-confirm`,
          search: `bookIds=${params.id}`,
        });
      };
      if (bookReq.loading) {
        return;
      }

      if (bookReq.data?.available === false) {
        return <PageActions description={"图书已下架"}></PageActions>;
      }

      if (userLocationInRange.error) {
        return (
          <PageActions description={"定位获取失败，请设置浏览器定位权限"} />
        );
      }
      if (!userLocationInRange.location) {
        return (
          <PageActions
            description={"定位中..."}
            actions={[
              <Button
                color={"primary"}
                fill={"outline"}
                style={{ borderRadius: "0px" }}
                loading={true}
                onClick={addBookToBookList}
              >
                加入书架
              </Button>,
              <Button
                color={"primary"}
                style={{ borderRadius: "0px" }}
                loading={true}
                onClick={borrowBook}
              >
                立即借阅
              </Button>,
            ]}
          />
        );
      }
      if (bookReq.data?.borrowing || bookReq.data?.reservationApplications?.length) {
        return (
          <PageActions
            description={
              libraryAuthTextFeedback(
                bookReq.data?.library,
                "disableReserveApplication"
              ) || "该图书已被借阅，可预约图书，取书时间会已邮件方式通知。"
            }
            actions={[
              <Button
                color={"primary"}
                fill={"outline"}
                style={{ borderRadius: "0px" }}
                onClick={addBookToBookList}
              >
                加入书架
              </Button>,
              <Button
                disabled={bookReq.data?.library.disableReserveApplication}
                color={"primary"}
                style={{ borderRadius: "0px" }}
                onClick={async () => {
                  await reservationBookApply({ bookId: params.id! });
                  Toast.show({
                    content:
                      "已为您预约此书籍，取书时间会已邮件形式通知，请按时取书！",
                    duration: 4000,
                  });
                }}
              >
                预约图书
              </Button>,
            ]}
          />
        );
      }
      if (userLocationInRange.isInRange) {
        return (
          <PageActions
            description={
              libraryAuthTextFeedback(bookReq.data?.library, "disableBorrow")
            }
            actions={[
              <Button
                color={"primary"}
                fill={"outline"}
                style={{ borderRadius: "0px" }}
                onClick={addBookToBookList}
              >
                加入书架
              </Button>,
              <Button
                disabled={bookReq.data?.library.disableBorrow}
                color={"primary"}
                style={{ borderRadius: "0px" }}
                onClick={borrowBook}
              >
                立即借阅
              </Button>,
            ]}
          />
        );
      } else {
        return (
          <PageActions
            description={
              libraryAuthTextFeedback(
                bookReq.data?.library,
                "disableReserve"
              ) || "定位不在图书馆范围只可进行预订操作"
            }
            actions={[
              <Button
                color={"primary"}
                fill={"outline"}
                style={{ borderRadius: "0px" }}
                onClick={addBookToBookList}
              >
                加入书架
              </Button>,
              <Button
                disabled={bookReq.data?.library.disableReserve}
                color={"primary"}
                style={{ borderRadius: "0px" }}
                onClick={reserveBook}
              >
                预订图书
              </Button>,
            ]}
          />
        );
      }
    }, [userLocationInRange, bookReq.data, bookReq.loading]);
    return (
      <>
        <div className={styles.bookDetail}>
          <div className={styles.bookBanner}>
            <Swiper autoplay>
              {bookReq.data?.files?.map((file, index) => (
                <Swiper.Item key={file.id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: 16,
                    }}
                  >
                    <div>
                      <Image
                        src={file?.url || "none"}
                        fallback={<FallbackBookImage width={80} />}
                        alt={"封面"}
                        width={80}
                        height={80 * 1.46}
                        onClick={() => {
                          setVisibleIndex(index);
                        }}
                      />
                    </div>
                  </div>
                </Swiper.Item>
              ))}
            </Swiper>
            <Space direction={"vertical"} style={{ padding: "12px" }}>
              <div className={styles.title}>{bookReq.data?.title}</div>
              <div className={styles.author}>作者：{bookReq.data?.author}</div>
            </Space>
          </div>
          <div className={styles.bookInfos}>
            <Descriptions
              options={[
                { label: "ISBN", value: bookReq.data?.isbn },
                { label: "发布年", value: bookReq.data?.publishedYear },
                { label: "所属图书馆", value: bookReq.data?.library.name },
              ]}
            />
          </div>
          {bookReq.data?.description ? (
            <div className={styles.bookDescription}>
              <div className={styles.title}>书籍简介</div>
              {bookReq.data?.description}
            </div>
          ) : undefined}
          <ImageViewer.Multi
            classNames={{
              mask: "customize-mask",
              body: "customize-body",
            }}
            images={bookReq.data?.files.map((file) => file.url)}
            visible={visibleIndex !== null}
            onClose={() => {
              setVisibleIndex(null);
            }}
          />
        </div>
        {ActionUI}
      </>
    );
  });
BookDetail.displayName = "图书详情";

export default BookDetail;
