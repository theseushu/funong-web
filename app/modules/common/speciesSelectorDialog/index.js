import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selector as fetchCatalogsSelector, actions as fetchCatalogsActions } from '../../api/fetchCatalogs/ducks';
import { selector as fetchCategoriesSelector, actions as fetchCategoriesActions } from '../../api/fetchCategories/ducks';
import { selector as fetchSpeciesSelector, actions as fetchSpeciesActions } from '../../api/fetchSpecies/ducks';
import Component from './speciesSelectorDialog';

export default connect(
  (state) => ({
    fetchCatalogsState: fetchCatalogsSelector(state),
    fetchCategoriesState: fetchCategoriesSelector(state),
    fetchSpeciesState: fetchSpeciesSelector(state),
  }),
  (dispatch) => ({ actions: bindActionCreators({ ...fetchCatalogsActions, ...fetchCategoriesActions, ...fetchSpeciesActions }, dispatch) }),
)(Component);
