import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Tabs, Tab } from 'react-mdl/lib/Tabs';
// import Button from 'react-mdl/lib/Button';
// import Link from 'react-router/lib/Link';
import Page from '../../page';
import styles, { breakpoints } from '../../../common/styles';
import { Card } from '../../../common/product';

class Supply extends Component { // eslint-disable-line
  static propTypes = {
    sheet: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
  }
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }
  render() {
    const { products, sheet: { classes } } = this.props;
    const { router } = this.context;
    return (
      <Page smallContent={false}>
        <div className={classes.content}>
          <Tabs
            activeTab={0} onChange={(tabId) => {
              if (tabId === 1) {
                router.push('/me/products/shop');
              }
            }} ripple
          >
            <Tab>农资农产供应</Tab>
            <Tab>微店商品</Tab>
          </Tabs>
          <div className={classes.products}>
            {
              products.map((product, i) => (
                <div key={i} className={`${classes.cell} ${styles.contentCenter}`}>
                  <Card product={product} />
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
