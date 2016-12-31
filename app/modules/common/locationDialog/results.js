import React, { PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { selector } from '../../api/searchDistrict/ducks';
import Liner from '../svgs/liner';

const Results = ({ pending, fulfilled, rejected, error, result = [], location: { country, province, city, district }, locationSelected }) => {
  if (pending) {
    return <div><Liner /></div>;
  } else if (rejected) {
    return (
      <div className="text-center">
        <span className="text-danger">读取列表失败, 请重试{error && error.toString()}</span>
      </div>
    );
  } else if (fulfilled) {
    const name = district || city || province || country;
    return (
      <div>
        {
          result.map((location, i) => <Button
            key={i}
            disabled={name === location.name}
            bsStyle={(name === location.name) ? 'info' : 'default'}
            onClick={() => {
              if (location.level === 'district') {
                locationSelected({
                  country,
                  province,
                  city,
                  district: location.name,
                  geopoint: { latitude: location.center.lat, longitude: location.center.lng },
                });
              } else if (location.level === 'city') {
                locationSelected({
                  country,
                  province,
                  city: location.name,
                  geopoint: (!location.districtList) && { latitude: location.center.lat, longitude: location.center.lng },
                });
              } else if (location.level === 'province') {
                locationSelected({
                  country,
                  province: location.name,
                  geopoint: (!location.districtList) && { latitude: location.center.lat, longitude: location.center.lng },
                });
              } else {
                locationSelected({
                  country: location.name,
                  geopoint: (!location.districtList) && { latitude: location.center.lat, longitude: location.center.lng },
                });
              }
            }
            }
          >{location.name}</Button>)
        }
      </div>
    );
  }
  return null;
};

Results.propTypes = {
  pending: PropTypes.bool,
  fulfilled: PropTypes.bool,
  rejected: PropTypes.bool,
  error: PropTypes.object,
  result: PropTypes.array,
  locationSelected: PropTypes.func.isRequired,
  location: PropTypes.shape({
    country: PropTypes.string,
    province: PropTypes.string,
    city: PropTypes.string,
    district: PropTypes.string,
  }),
};

export default connect(
  (state) => selector(state),
)(Results);
