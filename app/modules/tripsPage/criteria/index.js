import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { catalogs } from 'appConstants';
import Criteria, { criteriaToQuery } from 'modules/common/criteria';
import { selectors } from '../ducks';

export default connect(
  (state) => ({
    ...selectors.criteria(state),
    catalogGroups: catalogs.groupedFarm,
    countingState: selectors.countTripProducts(state),
  }),
  (dispatch, { location }) => bindActionCreators({ setCriteria: (criteria) => {
    const query = criteriaToQuery(criteria);
    return push(`${location.pathname}${query ? '?' : ''}${query}`);
  } }, dispatch),
)(Criteria);
