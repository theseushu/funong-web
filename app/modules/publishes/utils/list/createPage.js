import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import { publishTypesInfo } from 'funong-common/lib/appConstants';
import FABButton from 'modules/common/buttons/FABButton';
import { Layout } from 'modules/common/layouts';
import { MainRight as ContentMainRight } from 'modules/common/layout/content';
import { criteriaToQuery, queryToCriteria } from 'funong-common/lib/utils/criteriaUtils';
import PublishPage from 'modules/common/publishes/page';
import Criteria from 'modules/common/criteria';
import createRecommends from './createRecommends';

export default ({ type, ducks, catalogGroups, disabled, noRecommend }) => {
  const { actions, selectors } = ducks;
  const Recommends = createRecommends(type, actions, selectors);

  // location is a react-router param passed here
  const Page = ({ criteria, setCriteria, pending, result, sheet: { classes } }) => {
    const { keywords, ...other } = criteria;
    const info = publishTypesInfo[type];
    return (
      <Layout
        helmet={{ title: `富农商城-${info.title}` }}
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
                <div className={classes.main}>
                  <PublishPage pending={pending} type={type} page={result} />
                  <Link to={{ pathname: `/${info.route}/new` }} className={classes.addButton}><FABButton accent icon="add" title={`发${info.title}`} /></Link>
                </div>
              }
              right={
                noRecommend ? <div /> : <Recommends criteria={criteria} />
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
      return {
        pending: pageState.pending,
        result: pageState.result || [],
        criteria: queryToCriteria(query),
        setCriteria: (criteria) => {
          const q = criteriaToQuery(criteria);
          return browserHistory.replace(`${location.pathname}${q ? '?' : ''}${q}`);
        },
      };
    },
  )(injectSheet({
    page: {
      width: '100%',
    },
    main: {
      width: '100%',
      position: 'relative',
    },
    addButton: {
      position: 'absolute',
      top: -24,
      right: 16,
      zIndex: 2,
    },
  })(Page));
};
