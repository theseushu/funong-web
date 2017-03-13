const REST_KEY = 'a32257d72fc19975701feac6c6ab3743';

export const locationThumbnail = ({ longitude, latitude }, name) => ({
  thumbnail: `http://restapi.amap.com/v3/staticmap?location=${longitude},${latitude}&zoom=10&size=400*300&markers=small,0x0000FF,:${longitude},${latitude}&key=${REST_KEY}`,
  url: `http://uri.amap.com/marker?position=${longitude},${latitude}&name=${name || '地址'}&coordinate=gaode&callnative=0`,
});

export const distance = (source, target) => {
  if (!window || !window.AMap) {
    return null;
  }
  const sourceLnglat = new window.AMap.LngLat(source.longitude, source.latitude);
  return sourceLnglat.distance([target.longitude, target.latitude]);
};
