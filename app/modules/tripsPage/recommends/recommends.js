import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import BriefCard from 'modules/common/cards/tripBriefCard';

const Recommends = ({ products, sheet: { classes } }) => ( // eslint-disable-line no-unused-vars
  <div className={classes.recommends}>
    <h6>猜你喜欢</h6>
    {
      products.filter((product, i) => i < 4).map((product, i) => (
        <div key={i} className={classes.product}>
          <BriefCard key={i} product={product} />
        </div>
      ))
    }
  </div>
);

Recommends.propTypes = {
  products: PropTypes.array.isRequired,
  sheet: PropTypes.object.isRequired,
};

export default injectSheet({
  recommends: {
    '& > h6': {
      margin: '0 0 8px',
    },
  },
  product: {
    margin: '8px 0',
  },
})(Recommends);
