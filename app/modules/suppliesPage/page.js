import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Layout from '../common/layout';
import ContentMainRight from '../common/content/mainRight';
import Card from '../common/product/card';
import { breakpoints } from '../common/styles';
import { catalogTypes } from '../../appConstants/index';
import Criteria from './criteria';
import Recommends from './recommends';

const SuppliesPage = ({ user, products, sheet: { classes } }) => ( // eslint-disable-line no-unused-vars
  <Layout
    content={(
      <ContentMainRight
        main={
          <div>
            <Criteria
              types={Object.values(catalogTypes.supply).map((type) => type.value)}
            />
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
    )}
  >
  </Layout>
);

SuppliesPage.propTypes = {
  products: PropTypes.array.isRequired,
  user: PropTypes.object,
  sheet: PropTypes.object.isRequired,
};

export default injectSheet({
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
      width: '50%',
    },
    '@media (max-width: 400px)': {
      width: '100%',
    },
  },
})(SuppliesPage);
