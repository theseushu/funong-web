const REST_KEY = 'a32257d72fc19975701feac6c6ab3743';

export const locationThumbnail = ({ longitude, latitude }, name) => ({
  thumbnail: `http://restapi.amap.com/v3/staticmap?location=${longitude},${latitude}&zoom=10&size=400*300&markers=small,0x0000FF,:${longitude},${latitude}&key=${REST_KEY}`,
  url: `http://uri.amap.com/marker?position=${longitude},${latitude}&name=${name || '地址'}&coordinate=gaode&callnative=0`,
});

// export const distance = (source, target) => {
//   if (!window || !window.AMap) {
//     return null;
//   }
//   const sourceLnglat = new window.AMap.LngLat(source.longitude, source.latitude);
//   return sourceLnglat.distance([target.longitude, target.latitude]);
// };

export const distance = (source, target) => {
  const startLatitude = source.latitude;
  const startLongitude = source.longitude;
  const endLatitude = target.latitude;
  const endLongitude = target.longitude;

  const R = 12742001.579854401;
  const P = 0.01745329251994329;
  const lon1 = P * startLongitude;
  const lat1 = P * startLatitude;
  const lon2 = P * endLongitude;
  const lat2 = P * endLatitude;
  const d1 = Math.sin(lon1);
  const d2 = Math.sin(lat1);
  const d3 = Math.cos(lon1);
  const d4 = Math.cos(lat1);
  const d5 = Math.sin(lon2);
  const d6 = Math.sin(lat2);
  const d7 = Math.cos(lon2);
  const d8 = Math.cos(lat2);
  const tmp = Math.sqrt((d4 * d3 - d8 * d7) * (d4 * d3 - d8 * d7) + (d4 * d1 - d8 * d5) * (d4 * d1 - d8 * d5) + (d2 - d6) * (d2 - d6)); // eslint-disable-line
  return Math.asin(tmp / 2.0) * R;
};
