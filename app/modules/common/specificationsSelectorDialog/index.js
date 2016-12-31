import { connect } from 'react-redux';
import _pickBy from 'lodash/pickBy';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { selector as fetchSpecificationsSelector, actions as fetchSpecificationsActions } from '../../api/fetchSpecifications/ducks';
import { selector as createSpecificationSelector, actions as createSpecificationActions } from '../../api/createSpecification/ducks';
import { specificationsSelector } from '../../data/ducks/selectors';
import Component from './speciesSelectorDialog';

console.log(fetchSpecificationsActions)

export default connect(
  (state, ownProps) => ({
    fetchSpecificationsState: fetchSpecificationsSelector(state),
    createSpecificationState: createSpecificationSelector(state),
    specifications: createSelector(specificationsSelector, (specifications) => Object.values(_pickBy(specifications, (spec) => spec.species === ownProps.species.objectId)))(state),
  }),
  (dispatch) => bindActionCreators({ ...fetchSpecificationsActions, ...createSpecificationActions }, dispatch),
)(Component);
