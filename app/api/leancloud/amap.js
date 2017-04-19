import _once from 'lodash/once';
// const WEB_KEY = '47126811591e35236dbde1130d579dde';

// const loadMapFunc = _once(async () => {
//   const Map = await new Promise((resolve) => {
//     window.initAMap = () => {
//       resolve(window.AMap);
//     };
//     const script = document.createElement('script');
//     script.id = '_amap_script';
//     script.type = 'text/javascript';
//     script.src = `https://webapi.amap.com/maps?v=1.3&key=${WEB_KEY}&callback=initAMap`;
//     document.head.appendChild(script);
//   });
//   const Geocoder = await new Promise((resolve) => {
//     Map.plugin('AMap.Geocoder', () => {
//       const result = new Map.Geocoder({});
//       resolve(result);
//     });
//   });
//   const DistrictSearch = await new Promise((resolve) => {
//     Map.service('AMap.DistrictSearch', () => {
//       const result = new Map.DistrictSearch({
//         showbiz: false,
//       });
//       resolve(result);
//     });
//   });
//   return { Map, Geocoder, DistrictSearch };
// });

const loadMapFunc = _once(async () => {
  const Map = window.AMap;
  const Geocoder = await new Promise((resolve) => {
    Map.plugin('AMap.Geocoder', () => {
      const result = new Map.Geocoder({});
      resolve(result);
    });
  });
  const DistrictSearch = await new Promise((resolve) => {
    Map.service('AMap.DistrictSearch', () => {
      const result = new Map.DistrictSearch({
        showbiz: false,
      });
      resolve(result);
    });
  });
  return { Map, Geocoder, DistrictSearch };
});

const loadGeolocation = async (Map, map) =>
  new Promise((resolve) => {
    map.plugin('AMap.Geolocation', () => {
      const result = new Map.Geolocation({
        panToLocation: true,
        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
        timeout: 10000,          // 超过10秒后停止定位，默认：无穷大
        zoomToAccuracy: false,      // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonPosition: 'RB',
        maximumAge: 100000000, // todo caching result forever. seems useless, to be removed
      });
      map.addControl(result);
      resolve(result);
    });
  });


const bindOnClick = (Map, map, geocoder, onClick) => {
  const clickHandler = (e) => {
    const marker = new Map.Marker({
      position: e.lnglat,
      map,
      animation: 'AMAP_ANIMATION_DROP',
    });
    geocoder.getAddress(e.lnglat, (status, result) => {
      if (status === 'complete' && result.info === 'OK') {
        const { addressComponent, formattedAddress } = result.regeocode;
        onClick(marker, {
          lnglat: {
            longitude: e.lnglat.lng,
            latitude: e.lnglat.lat,
          },
          address: {
            country: addressComponent.country || '中国',
            province: addressComponent.province,
            city: addressComponent.province && addressComponent.city,
            district: addressComponent.city && addressComponent.district,
            street: addressComponent.district && addressComponent.street,
            details: formattedAddress,
          },
        });
      }
    });
  };
  map.on('click', clickHandler);
};

export default () => {
  if (process.env.browser) {
    const maps = {};
    let geolocation;
    const initMap = async ({ id, zoom = 10, onClick, center }) => {
      if (maps[id]) {
        console.error(`You're creating map on dom element ${id} twice!`); // eslint-disable-line
        return;
      }
      const { Map, Geocoder } = await loadMapFunc();
      const map = new Map.Map(id, {
        resizeEnable: true,
        zoom,
        mapStyle: 'fresh',
      });
      let marker;
      if (center) {
        const lnglat = new Map.LngLat(center.longitude, center.latitude);
        map.setCenter(lnglat);
        marker = new Map.Marker({
          position: lnglat,
          map,
          animation: 'AMAP_ANIMATION_DROP',
        });
      }
      maps[id] = { map, marker };
      if (onClick) {
        const clickHandler = (newMarker, location) => {
          if (maps[id].marker) {
            maps[id].marker.setMap(null);
          }
          marker = newMarker;
          maps[id] = { map, marker };
          onClick(location);
        };
        bindOnClick(Map, map, Geocoder, clickHandler);
      }
    };
    const destroyMap = async ({ id }) => {
      if (!maps[id]) {
        console.error(`Map ${id} doesn't exist!`); // eslint-disable-line
        return;
      }
      const map = maps[id].map;
      map.clearMap();
      map.destroy();
      delete maps[id];
    };

    const centerMap = async ({ id, center }) => {
      if (!maps[id]) {
        console.error(`Cannot find map on dom element ${id}!`);// eslint-disable-line
        return;
      }
      const { Map } = await loadMapFunc();
      const { map, marker } = maps[id];
      const lnglat = new Map.LngLat(center.longitude, center.latitude);
      map.setCenter(lnglat);
      if (marker) {
        marker.setMap(null);
      }
      maps[id] = {
        map,
        marker: new Map.Marker({
          position: lnglat,
          map,
          animation: 'AMAP_ANIMATION_DROP',
        }),
      };
    };

    const getCurrentLocation = async () => {
      const { Map } = await loadMapFunc();
      if (!geolocation) {
        // create a invisible map just for geo locating
        const div = document.createElement('div');
        div.id = '_amap_invisible_map';
        div.style = 'display: none';
        document.body.appendChild(div);
        const map = new Map.Map('_amap_invisible_map', {
          resizeEnable: true,
          mapStyle: 'fresh',
        });
        geolocation = await loadGeolocation(Map, map);
      }
      return new Promise((resolve, reject) => {
        Map.event.addListenerOnce(geolocation, 'complete', ({ addressComponent, formattedAddress, position }) => {
          resolve({
            address: {
              country: addressComponent.country || '中国',
              province: addressComponent.province,
              city: addressComponent.province && addressComponent.city,
              district: addressComponent.city && addressComponent.district,
              details: formattedAddress,
            },
            lnglat: {
              longitude: position.lng,
              latitude: position.lat,
            },
          });
        });
        Map.event.addListenerOnce(geolocation, 'error', (err) => {
          reject(err);
        });
        geolocation.getCurrentPosition();
      });
    };

    const searchDistrict = async ({ name, level, subdistrict = 1 }) => {
      const { DistrictSearch } = await loadMapFunc();
      return new Promise((resolve, reject) => {
        if (level) {
          DistrictSearch.setLevel(level);
        }
        DistrictSearch.setSubdistrict(subdistrict);
        DistrictSearch.search(name, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            // todo this method should always resolve an array. it could be empty but never null
            resolve(result.districtList);
          } else {
            reject(result);
          }
        });
      });
    };

    return {
      centerMap,
      destroyMap,
      getCurrentLocation,
      searchDistrict,
      initMap,
    };
  }
  return {
    getCurrentLocation: () => { throw new Error('Do not call this method outside browser'); },
    searchDistrict: () => { throw new Error('Do not call this method outside browser'); },
    initMap: () => { throw new Error('Do not call this method outside browser'); },
  };
};
