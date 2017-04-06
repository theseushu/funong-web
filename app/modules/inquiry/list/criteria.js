import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { replace } from 'react-router-redux';
import Criteria from 'modules/common/criteria';
import { criteriaToQuery, queryToCriteria } from 'utils/criteriaUtils';
import { catalogs } from 'appConstants';

export default connect(
  (state, { location: { query } }) => ({
    ...queryToCriteria(query),
    catalogGroups: catalogs.groupedFarm,
  }),
  (dispatch, { location }) => bindActionCreators({ setCriteria: (criteria) => {
    const query = criteriaToQuery(criteria);
    return replace(`${location.pathname}${query ? '?' : ''}${query}`);
  } }, dispatch),
)(Criteria);
