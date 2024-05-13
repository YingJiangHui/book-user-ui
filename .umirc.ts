import { defineConfig } from "@umijs/max";
// @ts-ignore
import px2vw from "postcss-px-to-viewport";
export default defineConfig({
  antd: false,
  access: {},
  model: {},
  initialState: {},
  request: {
    dataField: "",
  },
  layout: false,
  extraPostCSSPlugins: [
    px2vw({
      unitToConvert: "px", // 要转化的单位
      viewportWidth: 375, // 视窗的宽度，可根据自己的需求调整（这里是以PC端为例）
      viewportHeight: 667, // 视窗的高度
      unitPrecision: 6, // 转换后的精度，即小数点位数
      propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
      fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
      selectorBlackList: ["wrap"], // 指定不转换为视窗单位的类名，
      minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
      landscape: false, // 是否处理横屏情况
    }),
  ],
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
    { path: "/login", component: "auth/login/index", layout: false },
  ],
  npmClient: "pnpm",
  proxy: {
    "/api": {
      target: "http://localhost:8099",
      changeOrigin: true,
      // 'pathRewrite': { '^/api' : '' },
    },
  },
});
