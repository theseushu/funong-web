import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectSheet from 'react-jss';
import Dialog from '../common/dialog';
import { selector as fetchLocationSelector, actions as fetchLocationActions } from '../api/fetchLocation/ducks';
import { actions, selector } from './ducks';
import { initAMap } from '../api/initAMap';
import { formatAddress } from '../../utils/displayUtils';

const INITIAL_LOCATION = { address: { country: '', province: '', city: '', district: '', details: '' }, lnglat: {} };

class mapDialog extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    closeDialog: PropTypes.func.isRequired,
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
    initAMap: PropTypes.func.isRequired,
    fetchLocation: PropTypes.func.isRequired,
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
    this.state = { location: props.value || INITIAL_LOCATION, current: { country: '中国' } };
  }
  componentDidMount() {
    this.props.initAMap({
      onClick: this.onMapClick,
      meta: {
        resolve: () => {
          if (!this.props.value) {
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
  onMapClick = ({ address, lnglat }) => {
    this.setState({ location: { address, lnglat } });
  }
  submit = () => {
    this.props.closeDialog();
  }
  render() {
    const { open, closeDialog } = this.props;
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
            <h5>
              {formatAddress(location.address)}
            </h5>
            <p>
              {location.address.details}
            </p>
          </div>
        }
        submit={{
          onSubmit: () => {},
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
