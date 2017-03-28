import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { replace } from 'react-router-redux';
import Criteria, { criteriaToQuery } from 'modules/common/criteria';
import { catalogs } from 'appConstants';
import { selectors } from './ducks';

const criteriaSelector = selectors.criteria;

export default connect(
  (state) => ({
    ...criteriaSelector(state),
    catalogGroups: catalogs.groupedFarm,
  }),
  (dispatch, { location }) => bindActionCreators({ setCriteria: (criteria) => {
    const query = criteriaToQuery(criteria);
    return replace(`${location.pathname}${query ? '?' : ''}${query}`);
  } }, dispatch),
)(Criteria);
