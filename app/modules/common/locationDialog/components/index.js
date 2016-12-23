import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Breadcrumb from 'react-bootstrap/lib/Breadcrumb';
import Button from 'react-bootstrap/lib/Button';
import Dialog from '../../dialog';

import Liner from '../../svgs/liner';

const styles = {
  modalBody: {
    maxHeight: 'calc(100vh - 182px)',
    overflow: 'hidden',
  },
  dates: {
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 308px)',
  },
  width500: {
    width: 500,
    maxWidth: '100%',
    margin: '0 auto 0 auto',
  },
  catalogTypes: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

const INITIAL_LOCATION = {};

class locationSelectorDialog extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    sheet: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    actions: PropTypes.shape({
      fetchLocation: PropTypes.func.isRequired,
      searchDistrict: PropTypes.func.isRequired,
      searchSubdistrict: PropTypes.func.isRequired,
    }).isRequired,
    fetchLocationState: PropTypes.object.isRequired,
    searchDistrictState: PropTypes.object.isRequired,
    location: PropTypes.shape({
      geopoint: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
      }),
      country: PropTypes.string,
      province: PropTypes.string,
      city: PropTypes.string,
      district: PropTypes.string,
      details: PropTypes.string,
    }),
  };
  constructor(props) {
    super(props);
    this.state = { location: props.location || INITIAL_LOCATION };
  }
  componentDidMount() {
    this.props.actions.fetchLocation({
      meta: {
        resolve: (amapLocation) => {
          if (this.state.location === INITIAL_LOCATION) { // haven't been touched by user yet
            const { addressComponent } = amapLocation;
            this.setLocation({
              country: addressComponent.country || '中国',
              province: addressComponent.province,
              city: addressComponent.city,
            });
          }
          // do nothing if user has changed state.location already
        },
        reject: () => {
          this.setLocation({ country: '中国' });
        },
      },
    });
  }
  setLocation = ({ country, province, city, district, geopoint }) => {
    this.setState({ location: { country, province, city, district, geopoint } }, () => {
      const { searchSubdistrict } = this.props.actions;
      if (geopoint) {
        this.submit();
      } else if (district) {
        // TODO should not happen
      }
      if (city) {
        searchSubdistrict({ name: city, level: 'city' });
      } else if (province) {
        searchSubdistrict({ name: province, level: 'province' });
      } else if (country) {
        searchSubdistrict({ name: country, level: 'country' });
      }
    });
  }
  submit = () => {
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit(this.state.location);
    }
    this.props.close();
  }
  renderCurrent = () => {
    const { fetchLocationState, sheet: { classes } } = this.props;
    if (fetchLocationState.pending) {
      return <div className="text-info">正在读取当前位置</div>;
    } else if (fetchLocationState.fulfilled) {
      const location = fetchLocationState.location || {};
      const address = location.addressComponent || {};
      const country = address.country || '中国';
      const province = address.province;
      const city = province && address.city; // in case of broken data
      const district = city && address.district; // in case of broken data
      const position = location.position;
      return (
        <div className={classes.catalogTypes}>
          <span><strong>当前位置:</strong></span>
          <span>
            <Button
              bsStyle="info"
              bsSize="xsmall"
              onClick={() => {
                this.setLocation({ country });
              }}
            >{country}</Button>
            <Button
              bsStyle="info"
              bsSize="xsmall"
              onClick={() => {
                this.setLocation({ country, province });
              }}
            >{province}</Button>
            <Button
              bsStyle="info"
              bsSize="xsmall"
              onClick={() => {
                this.setLocation({ country, province, city });
              }}
            >{city}</Button>
            <span>{district}</span>
          </span>
          <span className="text-primary">
            <a
              href="#aa"
              onClick={() => {
                this.setLocation({ country, province, city, district, geopoint: { latitude: position.lat, longitude: position.lng } });
              }
              }
            >使用</a></span>
        </div>
      );
    }
    // do nothing. we don't show this error to user
    return null;
  }
  renderHeader = () => {
    const { country, province, city, district } = this.state.location;
    if (!country) {
      return null;
    }
    return (
      <Breadcrumb>
        {
          country && (<Breadcrumb.Item
            active={!province}
            onClick={(e) => {
              e.preventDefault();
              this.setLocation({ country });
            }
            }
          >
            {country}
          </Breadcrumb.Item>)
        }
        {
          province && (<Breadcrumb.Item
            active={!city}
            onClick={(e) => {
              e.preventDefault();
              this.setLocation({ country, province });
            }
            }
          >
            {province}
          </Breadcrumb.Item>)
        }
        {
          city && (<Breadcrumb.Item
            active={!district}
            onClick={(e) => {
              e.preventDefault();
              this.setLocation({ country, province, city });
            }
            }
          >
            {city}
          </Breadcrumb.Item>)
        }
      </Breadcrumb>
    );
  }
  renderSearchResult = () => {
    // result should not be undefined, but if it happens...
    const { pending, fulfilled, rejected, error, result = [] } = this.props.searchDistrictState;
    const { country, province, city } = this.state.location;
    // const { searchSubdistrict } = this.props.actions;
    if (pending) {
      return <div><Liner /></div>;
    } else if (rejected) {
      return (
        <div className="text-center">
          <span className="text-danger">读取列表失败, 请重试{error && error.toString()}</span>
        </div>
      );
    } else if (fulfilled) {
      return (
        <div>
          {
            result.map((location, i) => <Button
              key={i} onClick={() => {
                if (location.level === 'district') {
                  this.setLocation({
                    country,
                    province,
                    city,
                    district: location.name,
                    geopoint: { latitude: location.center.lat, longitude: location.center.lng },
                  });
                } else if (location.level === 'city') {
                  this.setLocation({
                    country,
                    province,
                    city: location.name,
                    geopoint: (!location.districtList) && { latitude: location.center.lat, longitude: location.center.lng },
                  });
                } else if (location.level === 'province') {
                  this.setLocation({
                    country,
                    province: location.name,
                    geopoint: (!location.districtList) && { latitude: location.center.lat, longitude: location.center.lng },
                  });
                } else {
                  this.setLocation({
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
  }
  render() {
    const { close } = this.props;
    return (
      <Dialog
        show
        onHide={close}
        onCancel={close}
        title={'选择发货地点'}
        fixedContent={
          <div>
            {this.renderCurrent()}
            {this.renderHeader()}
          </div>
        }
        scrollableContent={
          <div>
            {this.renderSearchResult()}
          </div>
        }
      />
    );
  }
}


export default injectSheet(styles)(locationSelectorDialog);
