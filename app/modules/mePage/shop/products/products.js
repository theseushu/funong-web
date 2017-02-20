import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import { Card, CardTitle, CardMedia } from 'react-mdl/lib/Card';
import Icon from 'react-mdl/lib/Icon';
import IconButton from 'react-mdl/lib/IconButton';
import Button from 'react-mdl/lib/Button';
import styles, { breakpoints } from 'modules/common/styles';
import { createShopProductsSelector } from 'modules/data/ducks/selectors';
import ShopProductCard from 'modules/common/cards/shopProduct';
import Page from '../../page';
import Toolbar from './toolbar';

const style = {
  media: {
    width: 100,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    '& > i': {
      fontSize: '50px',
    },
  },
};

const NoShopComponent = ({ classes }) => (
  <Card shadow={2} style={{ width: '100%', margin: 'auto' }}>
    <CardTitle>
      <h2 className={`${styles.colorWarning} mdl-card__title-text`}>尚未开店</h2>
      <h2 className="mdl-card__title-text"><small>您尚未创建店铺，<Link to="/me/shop">立即去开店</Link></small></h2>
    </CardTitle>
    <CardMedia className={styles.contentCenter} style={{ background: 'none' }}>
      <div className={classes.media}>
        <Icon className={styles.colorWarning} name="warning" />
      </div>
    </CardMedia>
  </Card>
);
NoShopComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};
const NoShop = injectSheet(style)(NoShopComponent);

class Products extends Component { // eslint-disable-line
  static propTypes = {
    classes: PropTypes.object,
    location: PropTypes.object.isRequired,
    shop: PropTypes.object,
    products: PropTypes.array.isRequired,
  }
  render() {
    const { location: { query }, shop, products, classes } = this.props;
    let content;
    if (!shop) {
      content = <NoShop />;
    } else {
      content = (
        <div>
          <Toolbar query={query} />
          <div className={classes.products}>
            {products.map((product, i) => (
              <ShopProductCard
                key={i}
                product={product}
                actions={[
                  <Button key={0} colored accent={product.available}>{product.available ? '下架' : '上架'}</Button>,
                  <Link key={1} to={{ pathname: `/product/${product.objectId}`, query: { edit: true } }}><IconButton colored name="edit"></IconButton></Link>,
                  <IconButton key={2} accent name="delete_sweep">删除</IconButton>,
                ]}
              />
            ))}
          </div>
        </div>
      );
    }
    return (
      <Page smallContent={false}>
        <div className={classes.content}>
          {content}
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
})(connect(
  (state, props) => ({ products: createShopProductsSelector(props.shop.objectId)(state) })
)(Products));
