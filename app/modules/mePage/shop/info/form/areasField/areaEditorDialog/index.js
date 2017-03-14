import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selector, searchSubdistrict } from 'api/searchDistrict';
import Component from './areaEditorDialog';

export default connect(
  (state) => ({
    searchDistrictState: selector(state),
  }),
  (dispatch) => ({ actions: bindActionCreators({ searchSubdistrict }, dispatch) }),
)(Component);
