import React, { memo, useState } from "react";
import { useParams, useRequest } from "@@/exports";
import { getBook } from "@/service/book";
import { Button, Image, ImageViewer, List, Space, Swiper } from "antd-mobile";
import { FallbackBookImage } from "@/components/FallbackBookImage";
import styles from "./index.less";
import { Descriptions } from "@/components/Descriptions/description";
import { PageActions } from "@/components/PageActions";
type props = {};
export type BookDetailProps = props;
export const BookDetail: React.FC<React.PropsWithChildren<BookDetailProps>> =
  memo((props) => {
    const params = useParams<{ id: string }>();
    console.log(params.id);
    const bookReq = useRequest(getBook, {
      defaultParams: [{ id: params.id! }],
    });
    const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
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
                        fallback={<FallbackBookImage />}
                        alt={"封面"}
                        width={80}
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
        <PageActions
          description={"定位不在图书馆范围只可进行预约操作"}
          actions={[
            <Button
              color={"primary"}
              fill={"outline"}
              style={{ borderRadius: "0px" }}
            >
              加入书单
            </Button>,
            <Button color={"primary"} style={{ borderRadius: "0px" }}>
              预约图书
            </Button>,
          ]}
        />
      </>
    );
  });
BookDetail.displayName = "图书详情";

export default BookDetail;
