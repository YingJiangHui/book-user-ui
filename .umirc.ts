import { defineConfig } from "@umijs/max";
// @ts-ignore
import px2vw from "postcss-px-to-viewport";
export default defineConfig({
  antd: false,
  access: {},
  model: {},
  initialState: {},
  request: {
    dataField: "data",
  },
  layout: false,
  headScripts: [
    {
      content: `
    window._AMapSecurityConfig = {
          securityJsCode:'1a7f253a897308b74dc0f3d859b7f78f',
    }`,
      charset: "utf-8",
    },
  ],
  scripts: [
    "https://webapi.amap.com/maps?v=2.0&key=afbb14d219ab8177546eae44a24daa91",
  ],
  links: [
    { rel: 'icon', href: '/book.svg' },
  ],
  externals: {
    AMap: "window.AMap",
  },
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
    { path: "/", redirect: "/home" },
    { path: "/docs", component: "docs" },
    {
      path: "/libraries-map",
      component: "librariesMap/librariesMap",
      name: "图书馆位置",
    },
    { path: "/search", component: "search/search", name: "搜索图书" },
    { path: "/borrowing", component: "borrowing/borrowing", name: "借阅中" },
    {
      path: "/reservation",
      component: "reservation/reservation",
      name: "预订记录",
    },
    {
      path: "/reservation-application",
      component: "reservationApplication/reservationApplication",
      name: "预约记录",
    },
    {
      path: "/borrowing/history",
      component: "borrowing/history/borrowingHistory",
      name: "借阅历史",
    },
    { path: "/manual", component: "manual/manual", name: "用户手册" },
    {
      path: "/books/:id",
      component: "book/detail/detail",
      name: "图书详情",
    },
    {
      path: "books/reserve-confirm",
      component: "reserveConfirm/reserveConfirm",
      name: "预订确认",
    },
    {
      path: "books/borrow-confirm",
      component: "borrowConfirm/borrowConfirm",
      name: "借阅确认",
    },
    {
      component: "@/layouts/tabbar/index",
      routes: [
        {
          path: "/home",
          component: "home/home",
          name: "主页",
        },
        {
          path: "/category",
          component: "category/category",
          name: "图书分类",
        },
        {
          path: "/shelf",
          component: "shelf/shelf",
          name: "我的书架",
        },
        {
          path: "/my-page",
          component: "myPage/myPage",
          name: "我的",
        },
      ],
      layout: false,
    },
    {
      // path: "/auth",
      component: "auth/layouts/index",
      layout: false,
      routes: [
        {
          path: "/login",
          name: "登录",
          component: "auth/login/index",
          layout: false,
        },
        {
          path: "/register",
          component: "auth/register/index",
          name: "注册",
          layout: false,
        },
        {
          path: "/forget-password",
          name: "忘记密码",
          component: "auth/forgetPassword/index",
          layout: false,
        },
      ],
    },
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
