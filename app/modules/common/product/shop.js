import React, { PropTypes } from 'react';
import styles from 'modules/common/styles';
import { MainRight } from 'modules/common/layout/content';
import ShopCard from 'modules/common/shop/card';
import { Shop as ShopHeader } from './header';
import Desc from './desc';
import Comments from './comments';

const Shop = ({ product, location }) => (
  <div>
    <ShopHeader product={product} location={location} />
    <MainRight
      main={[
        <Desc key={0} product={product} />,
        <Comments key={1} supplyProduct={product} className={styles.mt24} />,
      ]}
      right={<ShopCard shop={product.shop} />}
    />
  </div>
);

Shop.propTypes = {
  product: PropTypes.object.isRequired,
  location: PropTypes.object,
};

export default Shop;
