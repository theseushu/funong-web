import React from 'react';
import Criteria from 'modules/common/criteria';
import { catalogs } from 'appConstants';

export default (props) => <Criteria {...props} catalogGroups={catalogs.groupedFarm} />;
// export default connect(
//   (state, { location: { query } }) => ({
//     ...queryToCriteria(query),
//     catalogGroups: catalogs.groupedFarm,
//   }),
//   (dispatch, { location }) => bindActionCreators({ setCriteria: (criteria) => {
//     const query = criteriaToQuery(criteria);
//     return replace(`${location.pathname}${query ? '?' : ''}${query}`);
//   } }, dispatch),
// )(Criteria);
