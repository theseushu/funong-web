import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { productNames } from 'appConstants';
import { Layout } from 'modules/common/layouts';
import { MainRight as ContentMainRight } from 'modules/common/layout/content';
import { breakpoints } from 'modules/common/styles';
import { queryToCriteria } from 'utils/criteriaUtils';
import LoadingDiv from 'modules/common/glossary/loadingDiv';
import NoResult from 'modules/common/glossary/noResult';
import { Page as ProductsPage } from 'modules/common/product';
import Criteria from 'modules/common/criteria';
import createRecommends from './createRecommends';

export default ({ type, ducks, BriefCard, catalogGroups }) => {
  const { actions, selectors } = ducks;
  const Recommends = createRecommends(actions, selectors, BriefCard);

  // location is a react-router param passed here
  const Page = ({ criteria, setCriteria, pending, result, sheet: { classes } }) => {
    const { keywords, ...other } = criteria;
    return (
      <Layout
        helmet={{ title: `富农商城-${productNames[type]}` }}
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
            <Criteria catalogGroups={catalogGroups} {...other} setCriteria={(c) => setCriteria({ ...c, keywords })} />
            <ContentMainRight
              main={
                <LoadingDiv pending={pending}>
                  {result && (
                    <ProductsPage empty={<NoResult />} type={type} page={result} onPageChange={(page) => { setCriteria({ ...criteria, page }); }} />
                  )}
                </LoadingDiv>
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
      const pageState = selectors.pageProducts(state);
      return { pending: pageState.pending, result: pageState.result || [], criteria: queryToCriteria(query) };
    },
    // (dispatch, { location }) => bindActionCreators({
    //   setCriteria: (criteria) => {
    //     const query = criteriaToQuery(criteria);
    //     // return replace(`${location.pathname}${query ? '?' : ''}${query}`);
    //   },
    // }, dispatch),
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
};
