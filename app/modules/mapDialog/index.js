import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectSheet from 'react-jss';
import Textfield from 'react-mdl/lib/Textfield';
import { Dialog } from 'modules/common/dialog';
import { actions as mapActions, selectors as mapSelectors } from 'api/map';
import { formatAddress } from 'utils/displayUtils';
import { actions, selector } from './ducks';

const INITIAL_LOCATION = { address: { country: '', province: '', city: '', district: '', details: '' }, lnglat: {} };

class mapDialog extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    detailsEditable: PropTypes.bool,
    closeDialog: PropTypes.func.isRequired,
    location: PropTypes.shape({
      lnglat: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
      }),
      address: PropTypes.shape({
        country: PropTypes.string,
        province: PropTypes.string,
        city: PropTypes.string,
        district: PropTypes.string,
        details: PropTypes.string,
      }),
    }),
    currentLocation: PropTypes.shape({
      lnglat: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
      }),
      address: PropTypes.shape({
        country: PropTypes.string,
        province: PropTypes.string,
        city: PropTypes.string,
        district: PropTypes.string,
        details: PropTypes.string,
      }),
    }),
    initMap: PropTypes.func.isRequired,
    centerMap: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    // getCurrentLocationState: PropTypes.shape({
    //   pending: PropTypes.bool,
    //   fulfilled: PropTypes.bool,
    //   rejected: PropTypes.bool,
    //   error: PropTypes.object,
    //   location: PropTypes.object,
    // }),
  };
  constructor(props) {
    super(props);
    const { location, currentLocation } = this.props;
    this.state = { location: location || currentLocation || INITIAL_LOCATION };
  }
  componentDidMount() {
    const { location } = this.state;
    this.props.initMap({
      id: '_amap_container',
      onClick: this.onMapClick,
      center: location !== INITIAL_LOCATION ? location.lnglat : null,
    });
  }
  componentWillReceiveProps({ open, location, currentLocation }) {
    if (open) {
      this.setState({ location: location || currentLocation || INITIAL_LOCATION }, () => {
        if (this.state.location !== INITIAL_LOCATION) {
          this.props.centerMap({
            id: '_amap_container',
            center: this.state.location.lnglat,
          });
        }
      });
    }
  }
  onMapClick = ({ address, lnglat }) => {
    this.setState({ location: { address, lnglat } });
  }
  closeDialog = () => {
    this.setState({ location: INITIAL_LOCATION });
    this.props.closeDialog();
  }
  submit = () => {
    this.props.closeDialog();
  }
  render() {
    const { open, onSubmit, detailsEditable } = this.props;
    // const { getCurrentLocationState: { pending, fulfilled }, open, closeDialog } = this.props;
    // const getCurrentLocationText = pending ? '正在读取当前地址' : (fulfilled ? location.formattedAddress : null); // eslint-disable-line no-nested-ternary
    const { location } = this.state;
    return (
      <Dialog
        show={open}
        close={this.closeDialog}
        onCancel={this.closeDialog}
        title="选择发货地点"
        fixedContent={
          <div id="_amap_container" style={{ width: '100%', height: 300 }}></div>
        }
        scrollableContent={
          <div>
            <h5 style={{ marginBottom: 0 }}>
              {formatAddress(location.address)}
            </h5>
            {
              detailsEditable ? (
                <Textfield
                  floatingLabel
                  label="详细地址(可编辑)"
                  name="_address_details"
                  rows={2}
                  style={{ width: '100%' }}
                  value={location.address.details}
                  onChange={(e) => {
                    this.setState({ location: { address: { ...location.address, details: e.target.value }, lnglat: location.lnglat } });
                  }}
                />
              ) : (
                <p style={{ marginTop: 16 }}>
                  {location.address.details}
                </p>
              )
            }
          </div>
        }
        submit={{
          onSubmit: () => {
            onSubmit(this.state.location);
            this.closeDialog();
          },
          disabled: location === INITIAL_LOCATION,
        }}
      />
    );
  }
}
export default connect(
  (state) => ({
    ...selector(state),
    currentLocation: mapSelectors.getCurrentLocation(state).location,
  }),
  (dispatch) => bindActionCreators({ ...actions, initMap: mapActions.init, centerMap: mapActions.center }, dispatch),
)(injectSheet({})(mapDialog));
