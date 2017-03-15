import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { replace } from 'react-router-redux';
import Criteria, { criteriaToQuery } from 'modules/common/criteria';

export default (selectors, catalogGroups) => {
  const criteriaSelector = selectors.criteria;
  const countProductsSelector = selectors.countProducts;
  return connect(
    (state) => ({
      ...criteriaSelector(state),
      catalogGroups,
      countingState: countProductsSelector(state),
    }),
    (dispatch, { location }) => bindActionCreators({ setCriteria: (criteria) => {
      const query = criteriaToQuery(criteria);
      return replace(`${location.pathname}${query ? '?' : ''}${query}`);
    } }, dispatch),
  )(Criteria);
};
