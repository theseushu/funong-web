import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Layout from 'modules/common/layout';
import { MainRight as ContentMainRight } from 'modules/common/layout/content';
import { breakpoints } from 'modules/common/styles';
import { catalogTypes } from 'appConstants/index';
import createCriteria from './createCriteria';
import createRecommends from './createRecommends';

export default ({ type, ducks, Card, BriefCard, catalogGroups }) => {
  const { actions, selectors } = ducks;
  const Criteria = createCriteria(selectors, catalogGroups);
  const Recommends = createRecommends(actions, selectors, BriefCard);

  // location is a react-router param passed here
  const Page = ({ location, products, sheet: { classes } }) => (
    <Layout
      content={
        <div className={classes.page}>
          <Criteria
            location={location}
            types={Object.values(catalogTypes[type]).map((t) => t.value)}
          />
          <ContentMainRight
            main={
              <div>
                <div className={classes.products}>
                  {
                    products.map((product, i) => (
                      <div key={i} className={classes.product}>
                        <Card key={i} product={product} />
                      </div>
                    ))
                  }
                </div>
              </div>
            }
            right={
              <Recommends />
            }
          />
        </div>
      }
    >
    </Layout>
  );

  Page.propTypes = {
    location: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
    sheet: PropTypes.object.isRequired,
  };

  return connect(
    (state) => {
      const searchState = selectors.searchProducts(state);
      return { products: searchState.result || [] };
    }
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
  })(Page));
};
