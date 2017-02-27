import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectors, actions } from 'api/category';
import Component from './categorySelectorDialog';

const { fetchCategories } = actions;
const fetchCategoriesSelector = selectors.fetchCategories;

export default connect(
  (state) => ({
    fetchCategoriesState: fetchCategoriesSelector(state),
  }),
  (dispatch) => ({ actions: bindActionCreators({ fetchCategories }, dispatch) }),
)(Component);
