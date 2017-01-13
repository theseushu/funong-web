import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';

import Product from '../../common/product';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  product: {
    width: '100%',
    '@media (min-width: 768px)': {
      width: '49%',
    },
  },
};

class Products extends Component {
  static propTypes = {
    fetchUserProducts: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
    sheet: PropTypes.object.isRequired,
  }
  componentDidMount() {
    this.props.fetchUserProducts({ user: this.props.user });
  }
  render() {
    const { products, sheet: { classes } } = this.props;
    return (
      <div className={classes.container}>
        {products.map((product, i) => <div key={i} className={classes.product}><Product product={product} /></div>)}
      </div>
    );
  }
}

export default injectSheet(styles)(Products);
