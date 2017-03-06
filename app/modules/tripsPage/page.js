import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Layout from 'modules/common/layout';
import { MainRight as ContentMainRight } from 'modules/common/layout/content';
import TripCard from 'modules/common/cards/tripProduct';
import { breakpoints } from 'modules/common/styles';
import { catalogTypes } from 'appConstants/index';
import Criteria from './criteria';
import Recommends from './recommends';

const TripsPage = ({ user, location, products, sheet: { classes } }) => { // eslint-disable-line no-unused-vars
  return (
    <Layout
      content={
        <div className={classes.page}>
          <Criteria
            disabled={['category']}
            location={location}
            types={Object.values(catalogTypes.supply).map((type) => type.value)}
          />
          <ContentMainRight
            main={
              <div>
                <div className={classes.products}>
                  {
                    products.map((product, i) => (
                      <div key={i} className={classes.product}>
                        <TripCard key={i} product={product} />
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
}

TripsPage.propTypes = {
  location: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  user: PropTypes.object,
  sheet: PropTypes.object.isRequired,
};

export default injectSheet({
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
})(TripsPage);