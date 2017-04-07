import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { replace } from 'react-router-redux';
import injectSheet from 'react-jss';
import { Layout } from 'modules/common/layouts';
import { MainRight as ContentMainRight } from 'modules/common/layout/content';
import { breakpoints } from 'modules/common/styles';
import { List } from 'modules/common/inquiry';
import BlockLoading from 'modules/common/glossary/loading';
import NoResult from 'modules/common/glossary/noResult';
import { criteriaToQuery, queryToCriteria } from 'utils/criteriaUtils';
import Criteria from './criteria';
import { selectors } from './ducks';

// location is a react-router param passed here
const Page = ({ criteria, setCriteria, pending, result, sheet: { classes } }) => {
  const { keywords, ...other } = criteria;
  return (
    <Layout
      helmet={{ title: '富农商城-采购' }}
      search={{
        label: '输入种类，地区',
        onSearch: (nexKeywords) => {
          setCriteria({ keywords: nexKeywords });
        },
        value: keywords || '',
      }}
    >
      <div className={classes.page}>
        <Criteria {...other} setCriteria={(c) => setCriteria({ ...c, keywords })} sorts={null} />
        <ContentMainRight
          main={
            pending ? (<BlockLoading />) : (
              <div>
                <div className={classes.products}>
                  { result.total === 0 ? <NoResult /> : <List inquiries={result.results} actions={['view']} /> }
                </div>
              </div>
            )
          }
          right={
            <div />
          }
        />
      </div>
    </Layout>
  );
};

Page.propTypes = {
  pending: PropTypes.bool,
  criteria: PropTypes.object.isRequired,
  setCriteria: PropTypes.func.isRequired,
  result: PropTypes.object,
  sheet: PropTypes.object.isRequired,
};

export default connect(
  (state, { location: { query } }) => {
    const pageState = selectors.pageInquiries(state);
    return { pending: pageState.pending, result: pageState.result, criteria: queryToCriteria(query) };
  },
  (dispatch, { location }) => bindActionCreators({
    setCriteria: (criteria) => {
      const query = criteriaToQuery(criteria);
      return replace(`${location.pathname}${query ? '?' : ''}${query}`);
    },
  }, dispatch)
)(injectSheet({
  page: {
    width: '100%',
  },
  products: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  product: {
    width: '25%',
    boxSizing: 'border-box',
    padding: '0 8px 16px',
    [breakpoints.mediaSmallScreen]: {
      width: '33.33%',
    },
    [breakpoints.mediaDestkopBelow]: {
      width: '33.33%',
    },
    '@media (max-width: 680px)': {
      width: '50%',
    },
    [breakpoints.mediaTabletBelow]: {
      width: '100%',
    },
  },
  productHorizontal: {
    width: '33.3%',
    boxSizing: 'border-box',
    padding: '0 8px 16px',
    [breakpoints.mediaSmallScreen]: {
      width: '50%',
    },
    [breakpoints.mediaDestkopBelow]: {
      width: '50%',
    },
    '@media (max-width: 680px)': {
      width: '100%',
    },
  },
})(Page));
