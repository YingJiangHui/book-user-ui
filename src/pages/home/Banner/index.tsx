import React, {memo} from "react";
import {Image, Space, Swiper} from "antd-mobile";
import {FallbackBookImage} from "@/components/FallbackBookImage";
import {useModel, useNavigate, useRequest} from "@@/exports";
import {getBooks} from "@/service/book";
import {delay} from "@/utils/utils";

type props = {};
export type HomeBannerProps = props;
export const HomeBanner: React.FC<React.PropsWithChildren<HomeBannerProps>> =
    memo((props) => {
        const {librarySearcher} = useModel("currentLibraryModel");
        const navigator = useNavigate();
        const bannerBooksReq = useRequest(
            () =>
                getBooks({
                    current: 1,
                    pageSize: 5,
                    isBanner: true,
                    firstLibraryId: librarySearcher?.id,
                }),
            {
                refreshDeps: [librarySearcher?.id],
            }
        );
        return (
            <div style={{background: "#fff", minHeight: 150}}>
                <Swiper autoplay>
                    {bannerBooksReq.data?.data?.map((book, index) => (
                        <Swiper.Item key={book.id}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    padding: 16,
                                }}
                            >
                                <Space direction={'vertical'} align={"center"}>
                                    <Image
                                        src={book.files[0]?.url || "none"}
                                        fallback={<FallbackBookImage width={80}/>}
                                        alt={"封面"}
                                        width={80}
                                        height={80 * 1.46}
                                        onClick={() => {
                                            navigator(`/books/${book.id}`);
                                        }}
                                    />
                                    {book.title}
                                </Space>
                            </div>
                        </Swiper.Item>
                    ))}
                </Swiper>
            </div>
        );
    });
HomeBanner.displayName = "主页banner";
