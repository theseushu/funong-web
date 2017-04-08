import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import IconButton from 'react-mdl/lib/IconButton';
import Button from 'react-mdl/lib/Button';
import FABButton from 'react-mdl/lib/FABButton';
import Icon from 'react-mdl/lib/Icon';
import { colors, breakpoints } from 'modules/common/styles';
import { createShopProductsSelector } from 'modules/data/ducks/selectors';
import ShopProductCard from 'modules/common/cards/shopProduct';
import Page from '../../page';
import Header from '../header';
import Toolbar from './toolbar';

class Products extends Component { // eslint-disable-line
  static propTypes = {
    classes: PropTypes.object,
    location: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
  }
  render() {
    const { location: { query }, products, classes } = this.props;
    return (
      <Page
        location={location}
        header={<Header />}
        smallContent={false}
        helmet={{ title: '富农商城-我的商品' }}
      >
        <div className={classes.content}>
          <Toolbar query={query} />
          <div className={classes.products}>
            <div className={classes.createButton}><Link to="/product/new"><FABButton accent><Icon name="add" /></FABButton></Link></div>
            {products.map((product, i) => (
              <div key={i} className={classes.cell}>
                <ShopProductCard
                  product={product}
                  actions={[
                    <Button key={0} colored accent={product.available}>{product.available ? '下架' : '上架'}</Button>,
                    <Link key={1} to={{ pathname: `/product/${product.objectId}`, query: { edit: true } }}><IconButton colored name="edit"></IconButton></Link>,
                    <IconButton key={2} accent name="delete_sweep">删除</IconButton>,
                  ]}
                />
              </div>
            ))}
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
  avatar: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  products: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
    borderTop: `solid 1px ${colors.colorLightGrey}`,
  },
  createButton: {
    position: 'absolute',
    right: 16,
    top: -28,
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
})(connect(
  (state, props) => ({ products: createShopProductsSelector(props.shop.objectId)(state) })
)(Products));
