import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Dialog from '../dialog';

import Breadcrumb from './breadcrumb';
import CurrentLocation from './currentLocation';
import Results from './results';

const styles = {
  catalogTypes: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

const INITIAL_LOCATION = {};

class locationSelectorDialog extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    searchSubdistrict: PropTypes.func.isRequired,
    value: PropTypes.shape({
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
    this.state = { location: props.value || INITIAL_LOCATION };
  }
  setLocation = ({ country, province, city, district, geopoint }) => {
    this.setState({ location: { country, province, city, district, geopoint } }, () => {
      const { searchSubdistrict } = this.props;
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
            <CurrentLocation
              locationSelected={(location) => this.setLocation(location)}
              currentLocationFetched={(location) => {
                if (this.state.location === INITIAL_LOCATION) {
                  this.setLocation(location);
                }
              }}
            />
            <Breadcrumb location={this.state.location} locationSelected={this.setLocation} />
          </div>
        }
        scrollableContent={
          <div>
            <Results location={this.state.location} locationSelected={this.setLocation} />
          </div>
        }
      />
    );
  }
}


export default injectSheet(styles)(locationSelectorDialog);
