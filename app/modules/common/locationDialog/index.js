import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from 'api/searchDistrict/ducks';
import LocationDialog from './locationDialog';

export default connect(
  null,
  (dispatch) => bindActionCreators(actions, dispatch),
)(LocationDialog);
