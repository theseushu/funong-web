import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { breakpoints } from 'modules/common/styles';
import Card from 'modules/common/publishes/cards/productBrief';
import { selectors } from '../../ducks';

const Products = ({ classes, products }) => (
  <div>
    <h4>当季精选</h4>
    <div className={classes.products}>
      {
        products.map((product, i) => <div className={classes.product} key={i}><Card publish={product} /></div>)
      }
    </div>
  </div>
);

Products.propTypes = {
  classes: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
};

export default injectSheet({
  products: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  product: {
    padding: 16,
    width: '25%',
    [breakpoints.mediaDestkopBelow]: {
      width: '33.3%',
    },
    [breakpoints.mediaTabletBelow]: {
      width: '50%',
    },
  },
})(connect(
  (state) => ({ products: selectors.recommend(state).result }),
)(Products));
