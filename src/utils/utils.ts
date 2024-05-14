// export const mockData = <T>(data: T) => {
//     return new Promise<ResultData<T>>((resolve, reject) => {
//         setTimeout(() => {
//             resolve({
//                 code: 200,
//                 msg: "ok",
//                 data: data
//             });
//         }, 1000);
//     });
// };

export const delay = <T>(timeout: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, timeout);
  });
};
