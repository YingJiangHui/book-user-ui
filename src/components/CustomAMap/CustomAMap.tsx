import React, { memo, useEffect, useRef } from "react";
import { CheckList, Popover, Space } from "antd-mobile";
import { QuestionCircleOutline } from "antd-mobile-icons";
import { useModel } from "@@/exports";

const markerInstance = new AMap.Marker({
  icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
  anchor: "bottom-center",
});

const circleInstance = new AMap.Circle({
  // center: new AMap.LngLat("116.403322", "39.920255"), // 圆心位置
  strokeColor: "#1677ff", //线颜色
  strokeOpacity: 1, //线透明度
  strokeWeight: 3, //线粗细度
  fillColor: "#1677ff", //填充颜色
  fillOpacity: 0.35, //填充透明度
  // draggable: true
});

type props = {};
// https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png
const circleOption = {
  // center: new AMap.LngLat("116.403322", "39.920255"), // 圆心位置
  strokeColor: "#1677ff", //线颜色
  strokeOpacity: 1, //线透明度
  strokeWeight: 3, //线粗细度
  fillColor: "#1677ff", //填充颜色
  fillOpacity: 0.35, //填充透明度
  // draggable: true
};

const currentLocationMarker = new AMap.Marker({
  // icon: "https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png",
  content:
    "<img src='https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png' height='35'>",
  anchor: "bottom-center",
});

export type CustomAMapProps = props;
export const CustomAMap: React.FC<React.PropsWithChildren<CustomAMapProps>> =
  memo((props) => {
    const {
      selectedLibrary,
      setSelectedLibrary,
      locationService,
      librariesReq,
      library,
    } = useModel("currentLibraryModel");

    const mapContainerRef = useRef<HTMLDivElement>(null);
    const MapRef = useRef<AMap.Map>();

    const { location: currentLocation } = locationService;
    const setCurrent = (longitude?: number, latitude?: number) => {
      console.log(longitude, latitude);
      if (longitude && latitude) {
        const center = new AMap.LngLat(longitude, latitude);
        currentLocationMarker.setPosition(center);
        MapRef.current?.add(currentLocationMarker);
      }
    };

    useEffect(() => {
      setCurrent(
        currentLocation?.coords.longitude,
        currentLocation?.coords.latitude
      );
    }, [currentLocation?.coords.latitude, currentLocation?.coords.longitude]);

    useEffect(() => {
      const { AMap } = window;
      if (AMap && mapContainerRef.current) {
        MapRef.current = new AMap.Map(mapContainerRef.current, {
          // center: [116.397428, 39.90923], // 中心点坐标
          zoom: 11, // 缩放级别
        });
      } else {
        console.error("AMap not loaded");
      }
      return () => {
        MapRef.current?.destroy();
      };
    }, []);
    const findById = (id: number) =>
      librariesReq.data?.find((item) => item.id === id);
    const getInRangeLibrary = () =>
      librariesReq.data?.find((item) =>
        locationService.inRange(
          item.latitude,
          item.longitude,
          item.circumference
        )
      );

    useEffect(() => {
      if (!selectedLibrary) return;
      const center = new AMap.LngLat(
        selectedLibrary?.longitude,
        selectedLibrary?.latitude
      );
      markerInstance.setPosition(center);
      circleInstance.setCenter(center);
      circleInstance.setRadius(selectedLibrary?.circumference);

      // MapRef.current?.remove(markerInstance);
      // MapRef.current?.remove(circleInstance);

      MapRef.current?.add(markerInstance);
      MapRef.current?.add(circleInstance);

      MapRef.current?.setCenter(center);
      MapRef.current?.setZoom(12);
    }, [selectedLibrary]);

    const toPoint = (library: API.Library.Instance) => {
      setSelectedLibrary(library);
      // const center = new AMap.LngLat(library?.longitude, library?.latitude);
      // markerInstance.setPosition(center);
      // circleInstance.setCenter(center);
      // circleInstance.setRadius(library?.circumference);
      // setTimeout(() => {
      //   MapRef.current?.add(markerInstance);
      //   MapRef.current?.add(circleInstance);
      //   // MapRef.current?.zoomIn();
      //   MapRef.current?.setCenter(markerInstance.getPosition()!);
      //   MapRef.current?.setZoom(10);
      // }, 500);
    };

    useEffect(() => {
      if (library) toPoint(library);
    }, [library]);
    return (
      <div style={{ position: "relative", height: "100%" }}>
        <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
        {currentLocation && librariesReq.data?.length ? (
          <div
            style={{
              position: "absolute",
              zIndex: 100,
              top: 0,
              right: 0,
              background: "#fff",
              padding: 12,
              borderRadius: 5,
              width: 200,
            }}
          >
            <Space
              align={"center"}
              justify={"between"}
              style={{ width: "100%" }}
            >
              <b>图书馆</b>

              <span>
                <Popover.Menu
                  actions={[
                    {
                      key: "payment",
                      text: "点击列表中的图书馆，切换到对应图书馆",
                    },
                    {
                      key: "bus",
                      text: "点击列表蓝色箭头，自动唤起高德地定位",
                    },
                    {
                      key: "assistant",
                      text: (
                        <>
                          <img
                            src="https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png"
                            height="25"
                          />
                          当前所在位置
                        </>
                      ),
                    },
                    {
                      key: "scan",
                      text: (
                        <>
                          {" "}
                          <img
                            src="https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png"
                            height="25"
                          />
                          图书馆位置{" "}
                        </>
                      ),
                    },
                    {
                      key: "scan",
                      text: (
                        <>
                          <span
                            style={{
                              color: "var(--adm-color-weak)",
                            }}
                          >
                            灰色字体
                          </span>
                          的图书馆为已关闭的图书馆
                        </>
                      ),
                    },
                  ]}
                  trigger="click"
                >
                  <QuestionCircleOutline />
                </Popover.Menu>
              </span>
            </Space>
            <br />
            <br />
            <div style={{ maxHeight: 300, overflow: "auto" }}>
              <CheckList
                defaultValue={
                  selectedLibrary
                    ? [selectedLibrary.id]
                    : library
                    ? [library.id as number]
                    : []
                }
                onChange={(e) => {
                  const library = findById(e[0] as any);
                  if (!library) {
                    return;
                  }
                  toPoint(library);
                }}
              >
                {/*Url = `https://uri.amap.com/navigation?from=${myLocation.lng},${myLocation.lat},${myLocation.formattedAddress}&to=${that.cabinData.longitude},${that.cabinData.latitude},${that.cabinData.name}&callnative=1`*/}
                {librariesReq.data?.map((item) => {
                  return (
                    <CheckList.Item value={item.id}>
                      <Space align={"center"}>
                        <a
                          href={`https://uri.amap.com/marker?position=${item.longitude},${item.latitude} `}
                          target={"_blank"}
                        >
                          <div
                            style={{
                              width: 21,
                              height: 21,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "-124px -23px",
                              backgroundImage:
                                "url(https://webapi.amap.com/theme/v1.3/images/newpc/diricon.png)",
                            }}
                          />
                        </a>
                        <span
                          style={{
                            color: item.closed
                              ? "var(--adm-color-weak)"
                              : undefined,
                          }}
                        >
                          {item.name}
                        </span>
                      </Space>
                    </CheckList.Item>
                  );
                })}
              </CheckList>
            </div>
          </div>
        ) : undefined}
      </div>
    );
  });
CustomAMap.displayName = "自定义地图组件";
