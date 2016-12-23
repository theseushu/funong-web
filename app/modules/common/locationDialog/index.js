import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selector as searchDistinctSelector, actions as searchDistinctActions } from '../../api/searchDistrict/ducks';
import { selector as fetchLocationSelector, actions as fetchLocationActions } from '../../api/fetchLocation/ducks';
import Component from './components';

export default connect(
  (state) => ({ fetchLocationState: fetchLocationSelector(state), searchDistrictState: searchDistinctSelector(state) }),
  (dispatch) => ({ actions: bindActionCreators({ ...fetchLocationActions, ...searchDistinctActions }, dispatch) }),
)(Component);
