export default () => {
  if (window) {
    let globalInstance;
    let map;
    let geolocation;
    let districtSearch;

    const loadGeolocation = (GLOBAL_INSTANCE, MAP_INSTANCE) => {
      if (geolocation) {
        return geolocation;
      }
      return new Promise((resolve) => {
        MAP_INSTANCE.plugin('AMap.Geolocation', () => {
          const result = new GLOBAL_INSTANCE.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 10000,          // 超过10秒后停止定位，默认：无穷大
            zoomToAccuracy: true,      // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: 'RB',
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

    const loadScript = async () => {
      if (map && geolocation && globalInstance && districtSearch) {
        return { globalInstance, map, geolocation, districtSearch };
      }
      await new Promise((resolve) => {
        window.initAMap = () => {
          globalInstance = window.AMap;
          map = new globalInstance.Map('', {
            resizeEnable: true,
            zoom: 11,
          });
          resolve();
        };
        const script = document.createElement('script');
        script.id = '_amap_script';
        script.type = 'text/javascript';
        script.src = 'https://webapi.amap.com/maps?v=1.3&key=47126811591e35236dbde1130d579dde&callback=initAMap';
        document.head.appendChild(script);
      });
      await Promise.all([loadGeolocation(globalInstance, map), loadDistrictSearch(globalInstance)]);
      return { map, geolocation, globalInstance, districtSearch };
    };

    const getCurrentLocation = async () => {
      await loadScript();
      return new Promise((resolve, reject) => {
        globalInstance.event.addListenerOnce(geolocation, 'complete', (data) => {
          resolve(data);
        });
        globalInstance.event.addListenerOnce(geolocation, 'error', (err) => {
          reject(err);
        });
        geolocation.getCurrentPosition();
      });
    };

    const searchDistrict = async ({ name, level, subdistrict = 1 }) => {
      await loadScript();
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
    };
  }
  return {
    getCurrentLocation: () => { throw new Error('Do not call this method outside browser'); },
    searchDistrict: () => { throw new Error('Do not call this method outside browser'); },
  };
};
