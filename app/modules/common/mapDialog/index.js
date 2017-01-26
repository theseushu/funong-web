import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectSheet from 'react-jss';
import Dialog from '../dialog';
import { formatLocation } from '../../../utils/displayUtils';
import { selector as fetchLocationSelector, actions as fetchLocationActions } from '../../api/fetchLocation/ducks';

const INITIAL_LOCATION = {};

class locationSelectorDialog extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
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
    fetchLocation: PropTypes.func.isRequired,
    fetchLocationState: PropTypes.shape({
      pending: PropTypes.bool,
      fulfilled: PropTypes.bool,
      rejected: PropTypes.bool,
      error: PropTypes.object,
      location: PropTypes.object,
    }),
  };
  constructor(props) {
    super(props);
    this.state = { location: props.value || INITIAL_LOCATION, current: { country: '中国' } };
  }
  componentDidMount() {
    if (!this.props.value) {
      this.props.fetchLocation({
        meta: {
          resolve: (amapLocation = { addressComponent: {} }) => {
            const { addressComponent } = amapLocation;
            this.setState({ current: {
              country: addressComponent.country || '中国',
              province: addressComponent.province,
              city: addressComponent.city,
            } });
            // do nothing if user has changed state.location already
          },
          reject: () => {
          },
        },
      });
    }
  }
  submit = () => {
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit(this.state.location);
    }
    this.props.close();
  }
  render() {
    const { close, fetchLocationState: { pending, fulfilled, location } } = this.props;
    const fetchLocationText = pending ? '正在读取当前地址' : (fulfilled ? location.formattedAddress : null); // eslint-disable-line no-nested-ternary
    return (
      <Dialog
        show
        onHide={close}
        onCancel={close}
        title="选择发货地点"
        fixedContent={
          <p style={{ margin: 0 }}>
            <small>{fetchLocationText}</small>
          </p>
        }
        scrollableContent={
          <div id="_amap_container" style={{ width: '100%', height: 300 }}></div>
        }
      />
    );
  }
}


export default connect(
  (state) => ({ fetchLocationState: fetchLocationSelector(state) }),
  (dispatch) => bindActionCreators(fetchLocationActions, dispatch),
)(injectSheet({})(locationSelectorDialog));
