export default () => {
  if (window) {
    let globalInstance;
    let map;
    let geolocation;
    let districtSearch;
    let geocoder;
    let clickHandler;
    let marker;

    const bindOnClick = (onClick) => {
      if (clickHandler) {
        map.off('click', clickHandler);
      }
      clickHandler = (e) => {
        if (marker) {
          marker.setMap(null);
        }
        marker = new globalInstance.Marker({
          position: e.lnglat,
          map,
          animation: 'AMAP_ANIMATION_DROP',
        });
        geocoder.getAddress(e.lnglat, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            const { addressComponent, formattedAddress } = result.regeocode;
            onClick({
              lnglat: {
                longitude: e.lnglat.lng,
                latitude: e.lnglat.lat,
              },
              address: {
                country: addressComponent.country || '中国',
                province: addressComponent.province,
                city: addressComponent.province && addressComponent.city,
                district: addressComponent.city && addressComponent.district,
                details: formattedAddress,
              },
            });
          }
        });
      };
      map.on('click', clickHandler);
    };

    const loadGeocoder = (GLOBAL_INSTANCE) => {
      if (geocoder) {
        return geocoder;
      }
      return new Promise((resolve) => {
        GLOBAL_INSTANCE.plugin('AMap.Geocoder', () => {
          const result = new GLOBAL_INSTANCE.Geocoder({});
          geocoder = result;
          resolve(result);
        });
      });
    };

    const loadGeolocation = (GLOBAL_INSTANCE, MAP_INSTANCE) => {
      if (geolocation) {
        return geolocation;
      }
      return new Promise((resolve) => {
        MAP_INSTANCE.plugin('AMap.Geolocation', () => {
          const result = new GLOBAL_INSTANCE.Geolocation({
            panToLocation: true,
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 10000,          // 超过10秒后停止定位，默认：无穷大
            zoomToAccuracy: false,      // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: 'RB',
            maximumAge: 100000000, // todo caching result forever. seems useless, to be removed
          });
          MAP_INSTANCE.addControl(result);
          geolocation = result;
          resolve(result);
        });
      });
    };

    const loadDistrictSearch = (GLOBAL_INSTANCE) => {
      if (districtSearch) {
        return districtSearch;
      }
      return new Promise((resolve) => {
        GLOBAL_INSTANCE.service('AMap.DistrictSearch', () => {
          const result = new GLOBAL_INSTANCE.DistrictSearch({
            showbiz: false,
          });
          districtSearch = result;
          resolve(result);
        });
      });
    };

    const initAMap = async (params = {}) => {
      const { onClick, center } = params;
      if (map && geolocation && globalInstance && districtSearch) {
        if (onClick) {
          bindOnClick(onClick);
        }
        if (center) {
          const lnglat = new globalInstance.LngLat(center.longitude, center.latitude);
          map.setCenter(lnglat);
          if (marker) {
            marker.setMap(null);
          }
          marker = new globalInstance.Marker({
            position: lnglat,
            map,
            animation: 'AMAP_ANIMATION_DROP',
          });
        }
        return { globalInstance, map, geolocation, districtSearch };
      }
      await new Promise((resolve) => {
        window.initAMap = () => {
          globalInstance = window.AMap;
          map = new globalInstance.Map('_amap_container', {
            resizeEnable: true,
            zoom: 10,
            mapStyle: 'fresh',
          });
          resolve();
        };
        const script = document.createElement('script');
        script.id = '_amap_script';
        script.type = 'text/javascript';
        script.src = 'https://webapi.amap.com/maps?v=1.3&key=47126811591e35236dbde1130d579dde&callback=initAMap';
        document.head.appendChild(script);
      });
      await Promise.all([loadGeocoder(globalInstance), loadGeolocation(globalInstance, map), loadDistrictSearch(globalInstance)]);
      bindOnClick(onClick);
      return { map, geolocation, globalInstance, districtSearch };
    };

    const getCurrentLocation = async () => {
      await initAMap();
      return new Promise((resolve, reject) => {
        globalInstance.event.addListenerOnce(geolocation, 'complete', ({ addressComponent, formattedAddress, position }) => {
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
        globalInstance.event.addListenerOnce(geolocation, 'error', (err) => {
          reject(err);
        });
        geolocation.getCurrentPosition();
      });
    };

    const searchDistrict = async ({ name, level, subdistrict = 1 }) => {
      await initAMap();
      return new Promise((resolve, reject) => {
        if (level) {
          districtSearch.setLevel(level);
        }
        districtSearch.setSubdistrict(subdistrict);
        districtSearch.search(name, (status, result) => {
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
      getCurrentLocation,
      searchDistrict,
      initAMap,
    };
  }
  return {
    getCurrentLocation: () => { throw new Error('Do not call this method outside browser'); },
    searchDistrict: () => { throw new Error('Do not call this method outside browser'); },
    initAMap: () => { throw new Error('Do not call this method outside browser'); },
  };
};
