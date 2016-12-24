import React, { PureComponent, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-bootstrap/lib/Button';
import { selector, actions } from '../../api/fetchLocation/ducks';
const styles = {
  catalogTypes: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

class CurrentLocation extends PureComponent {
  static propTypes = {
    pending: PropTypes.bool,
    fulfilled: PropTypes.bool,
    rejected: PropTypes.bool,
    error: PropTypes.object,
    location: PropTypes.shape({
      position: PropTypes.shape({
        lng: PropTypes.number.isRequired,
        lat: PropTypes.number.isRequired,
      }).isRequired,
      addressComponent: PropTypes.shape({
        adcode: PropTypes.string.isRequired,
        province: PropTypes.string,
        city: PropTypes.string,
        district: PropTypes.string,
      }),
    }),
    sheet: PropTypes.object.isRequired,
    fetchLocation: PropTypes.func.isRequired,
    currentLocationFetched: PropTypes.func.isRequired,
    locationSelected: PropTypes.func.isRequired,
  }
  componentDidMount() {
    this.props.fetchLocation({
      meta: {
        resolve: (amapLocation = { addressComponent: {} }) => {
          const { addressComponent } = amapLocation;
          this.props.currentLocationFetched({
            country: addressComponent.country || '中国',
            province: addressComponent.province,
            city: addressComponent.city,
          });
          // do nothing if user has changed state.location already
        },
        reject: () => {
          this.props.currentLocationFetched({ country: '中国' });
        },
      },
    });
  }
  render() {
    const { pending, fulfilled, rejected, error, location = {}, sheet: { classes }, locationSelected } = this.props;
    if (pending) {
      return <div className="text-info">正在读取当前位置</div>;
    } else if (fulfilled) {
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
            <Button bsStyle="info" bsSize="xsmall" onClick={() => locationSelected({ country })}>{country}</Button>
            {
              province &&
              <Button bsStyle="info" bsSize="xsmall" onClick={() => locationSelected({ country, province })}>{province}</Button>
            }
            {
              city &&
              <Button bsStyle="info" bsSize="xsmall" onClick={() => locationSelected({ country, province, city })}>{city}</Button>
            }
            {
              district && <span>{district}</span>
            }
          </span>
          {
            (province && city && district) &&
              <span className="text-primary">
                <a
                  href="#aa"
                  onClick={() => {
                    locationSelected({
                      country,
                      province,
                      city,
                      district,
                      geopoint: { latitude: position.lat, longitude: position.lng },
                    });
                  }
                  }
                >使用</a>
              </span>
          }
        </div>
      );
    } else if (rejected && error) {
      // todo we don't show this error to user. maybe prompt user to give location api access?
    }
    return null;
  }
}

export default connect(
  (state) => selector(state),
  (dispatch) => bindActionCreators(actions, dispatch),
)(injectSheet(styles)(CurrentLocation));
