import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectSheet from 'react-jss';
import Textfield from 'react-mdl/lib/Textfield';
import Dialog from 'modules/common/dialog';
import { initAMap } from 'api/initAMap';
import { selector as fetchLocationSelector, actions as fetchLocationActions } from 'api/fetchLocation/ducks';
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
    initAMap: PropTypes.func.isRequired,
    fetchLocation: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    // fetchLocationState: PropTypes.shape({
    //   pending: PropTypes.bool,
    //   fulfilled: PropTypes.bool,
    //   rejected: PropTypes.bool,
    //   error: PropTypes.object,
    //   location: PropTypes.object,
    // }),
  };
  constructor(props) {
    super(props);
    this.state = { location: props.location || INITIAL_LOCATION, current: { country: '中国' } };
  }
  componentDidMount() {
    const { location } = this.props;
    this.props.initAMap({
      onClick: this.onMapClick,
      center: location ? [location.lnglat.longitude, location.lnglat.latitude] : null,
      meta: {
        resolve: () => {
          if (!this.props.location) {
            this.props.fetchLocation({
              meta: {
                resolve: ({ address, lnglat }) => {
                  if (this.state.location === INITIAL_LOCATION) {
                    this.setState({ location: { address, lnglat } });
                  }
                  // do nothing if user has changed state.location already
                },
                reject: () => {
                },
              },
            });
          }
        },
      },
    });
  }
  componentWillReceiveProps({ location }) {
    if (location) {
      this.props.initAMap({
        center: { longitude: location.lnglat.longitude, latitude: location.lnglat.latitude },
      });
    }
  }
  onMapClick = ({ address, lnglat }) => {
    this.setState({ location: { address, lnglat } });
  }
  submit = () => {
    this.props.closeDialog();
  }
  render() {
    const { open, closeDialog, onSubmit, detailsEditable } = this.props;
    // const { fetchLocationState: { pending, fulfilled }, open, closeDialog } = this.props;
    // const fetchLocationText = pending ? '正在读取当前地址' : (fulfilled ? location.formattedAddress : null); // eslint-disable-line no-nested-ternary
    const { location } = this.state;
    return (
      <Dialog
        show={open}
        close={closeDialog}
        onCancel={closeDialog}
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
            closeDialog();
          },
          disabled: location === INITIAL_LOCATION,
        }}
      />
    );
  }
}


export default connect(
  (state) => ({ ...selector(state), fetchLocationState: fetchLocationSelector(state) }),
  (dispatch) => bindActionCreators({ ...actions, ...fetchLocationActions, initAMap }, dispatch),
)(injectSheet({})(mapDialog));
