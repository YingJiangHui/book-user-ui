import { useEffect, useState } from "react";

export const useGeolocation = (deps: React.DependencyList) => {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  useEffect(() => {
    // const geo = navigator.geolocation;
    // if (!geo) {
    //   const error = new GeolocationPositionError();
    //   setError(error);
    //   return;
    // }
    // const watcher = geo.getCurrentPosition((a) => {
    //   console.log(a, "a00");
    //   setLocation(a);
    // }, setError);
    // console.log("watcher", watcher);
    window.AMap.plugin('AMap.Geolocation', function() {
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：5s
        buttonPosition:'RB',    //定位按钮的停靠位置
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点

      });


      console.log(geolocation,'geolocation')
      geolocation.getCurrentPosition(function(status,result){
        if(status=='complete'){
          // onComplete(result)
          console.log(result,'result');
          //
          setLocation({
            coords:{
              latitude: result.position.lat,
              longitude: result.position.lng,
            }
          })
          // console.log(position_ie);
        }else{
          console.log(result,'result')
          setError(result)
          // onError(result)
        }
      });
    });

    // return () => geo.clearWatch(watcher);
  }, deps);
  console.log(location, "location");
  return { location, error };
};
