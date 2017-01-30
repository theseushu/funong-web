import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Tabs, Tab } from 'react-mdl/lib/Tabs';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import Button from 'react-mdl/lib/Button';
import Link from 'react-router/lib/Link';
import Page from '../../page';
import { breakpoints } from '../../../common/styles';
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
          <Grid>
            {
              products.map((product, i) => (
                <Cell key={i} col={4} tablet={4} phone={4}>
                  <Card product={product} />
                </Cell>
              ))
            }
          </Grid>
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
    display: 'flex',
    flexWrap: 'wrap',
  },
})(Supply);
