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

export function isWithinRange(
  lat1?: number,
  lon1?: number,
  range?: number,
  lat2?: number,
  lon2?: number
) {
  if (!lat1 || !lon1 || !range || !lat2 || !lon2) {
    return false;
  }
  const R = 6371000; // 地球半径，单位为米
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // 距离，单位为米
  return distance <= range;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
