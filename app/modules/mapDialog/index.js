import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectSheet from 'react-jss';
import { SimpleDialog } from 'modules/common/dialog';
import { actions as mapActions, selectors as mapSelectors } from 'api/map';
import { actions, selector } from './ducks';
import Location from './location';
import PostAddress from './postAddress';

const INITIAL_LOCATION = { address: { country: '', province: '', city: '', district: '', details: '' }, lnglat: {}, contact: '', postCode: '', phone: '' };

class mapDialog extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    detailsEditable: PropTypes.bool.isRequired,
    closeDialog: PropTypes.func.isRequired,
    postAddress: PropTypes.bool.isRequired,
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
    destroyMap: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    // getCurrentLocationState: PropTypes.shape({
    //   pending: PropTypes.bool,
    //   fulfilled: PropTypes.bool,
    //   rejected: PropTypes.bool,
    //   error: PropTypes.object,
    //   location: PropTypes.object,
    // }),
  };
  componentWillMount() {
    this.initStateLocation(this.props);
  }
  componentWillReceiveProps({ open, location, currentLocation }) {
    if (open && !this.props.open) {
      this.initStateLocation({ location, currentLocation }, () => {
        this.props.initMap({
          id: '_amap_container',
          onClick: this.onMapClick,
          center: this.state.location !== INITIAL_LOCATION ? this.state.location.lnglat : null,
        });
      });
    }
  }
  onMapClick = ({ address, lnglat }) => {
    this.setState({ location: { ...this.state.location, address, lnglat } });
  }
  onLocationChange = (location) => {
    this.setState({ location });
  }
  initStateLocation = ({ location, currentLocation }, callback) => {
    let nextLocation = INITIAL_LOCATION;
    if (location) {
      nextLocation = { ...INITIAL_LOCATION, ...location };
    } else if (currentLocation) {
      nextLocation = { ...INITIAL_LOCATION, ...currentLocation };
    }
    this.setState({ location: nextLocation }, callback);
  }
  closeDialog = () => {
    this.setState({ location: INITIAL_LOCATION });
    this.props.destroyMap({ id: '_amap_container' });
    this.props.closeDialog();
  }
  render() {
    const { open, onSubmit, detailsEditable, postAddress } = this.props;
    const { location } = this.state;
    return (
      <SimpleDialog
        show={open}
        close={this.closeDialog}
        onCancel={this.closeDialog}
        title="选择发货地点"
        content={
          <div>
            <div id="_amap_container" style={{ width: '100%', height: 200, marginBottom: 16 }}></div>
            { !postAddress && <Location detailsEditable={detailsEditable} location={location} onChange={this.onLocationChange} />}
            { postAddress && <PostAddress location={location} onChange={this.onLocationChange} />}
          </div>
        }
        submit={{
          onSubmit: () => {
            if (postAddress) {
              const { address, lnglat, contact, postCode, phone } = this.state.location;
              onSubmit({ address, lnglat, contact, postCode, phone });
            } else {
              const { address, lnglat } = this.state.location;
              onSubmit({ address, lnglat });
            }
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
  (dispatch) => bindActionCreators({ ...actions, initMap: mapActions.init, destroyMap: mapActions.destroy }, dispatch),
)(injectSheet({})(mapDialog));
