import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import styles, { breakpoints } from 'modules/common/styles';
import SupplyCard from 'modules/common/cards/supplyProduct';
import Tabs from '../tabs';
import Page from '../../page';

class Supply extends Component { // eslint-disable-line
  static propTypes = {
    sheet: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
  }
  render() {
    const { products, sheet: { classes } } = this.props;
    return (
      <Page smallContent={false}>
        <div className={classes.content}>
          <Tabs />
          <div className={classes.products}>
            {
              products.map((product, i) => (
                <div key={i} className={`${classes.cell} ${styles.contentCenter}`}>
                  <SupplyCard product={product} hideActions={false} />
                </div>
              ))
            }
          </div>
        </div>
      </Page>
    );
  }
}

export default injectSheet({
  content: {
    flex: '1',
    marginLeft: 24,
    [breakpoints.mediaDestkopBelow]: {
      marginLeft: 0,
    },
  },
  products: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  cell: {
    width: '25%',
    boxSizing: 'border-box',
    padding: 8,
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
})(Supply);
