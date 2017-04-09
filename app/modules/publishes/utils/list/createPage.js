import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { replace } from 'react-router-redux';
import injectSheet from 'react-jss';
import { publishTypesInfo } from 'appConstants';
import { Layout } from 'modules/common/layouts';
import { MainRight as ContentMainRight } from 'modules/common/layout/content';
import { criteriaToQuery, queryToCriteria } from 'utils/criteriaUtils';
import PublishPage from 'modules/common/publishes/page';
import Criteria from 'modules/common/criteria';
import createRecommends from './createRecommends';

export default ({ type, ducks, catalogGroups, disabled }) => {
  const { actions, selectors } = ducks;
  const Recommends = createRecommends(type, actions, selectors);

  // location is a react-router param passed here
  const Page = ({ criteria, setCriteria, pending, result, sheet: { classes } }) => {
    const { keywords, ...other } = criteria;
    return (
      <Layout
        helmet={{ title: `富农商城-${publishTypesInfo[type].title}` }}
        search={{
          label: '搜索',
          onSearch: (nexKeywords) => {
            setCriteria({ keywords: nexKeywords });
          },
          value: keywords || '',
        }}
      >
        {
          <div className={classes.page}>
            <Criteria catalogGroups={catalogGroups} {...other} setCriteria={(c) => setCriteria({ ...c, keywords })} disabled={disabled} />
            <ContentMainRight
              main={
                <PublishPage pending={pending} type={type} page={result} />
              }
              right={
                <Recommends criteria={criteria} />
              }
            />
          </div>
        }
      </Layout>
    );
  };

  Page.propTypes = {
    criteria: PropTypes.object.isRequired,
    setCriteria: PropTypes.func.isRequired,
    pending: PropTypes.bool,
    result: PropTypes.object.isRequired,
    sheet: PropTypes.object.isRequired,
  };

  return connect(
    (state, { location: { query } }) => {
      const pageState = selectors.page(state);
      return { pending: pageState.pending, result: pageState.result || [], criteria: queryToCriteria(query) };
    },
    (dispatch, { location }) => bindActionCreators({
      setCriteria: (criteria) => {
        const query = criteriaToQuery(criteria);
        return replace(`${location.pathname}${query ? '?' : ''}${query}`);
      },
    }, dispatch),
  )(injectSheet({
    page: {
      width: '100%',
    },
  })(Page));
};
