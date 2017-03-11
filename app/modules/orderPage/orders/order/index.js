import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Card, CardTitle } from 'react-mdl/lib/Card';
import { formatPrice } from 'utils/displayUtils';
import { colors } from 'modules/common/styles';
import Owner from './owner';

const Order = ({ order: { owner, shop, items }, classes }) => (
  <Card shadow={0} className={classes.card}>
    <CardTitle>
      <Owner user={owner} shop={shop} />
    </CardTitle>
    <ul className={classes.items}>
      {items.map(({ quantity, product }, i) => (
        <li key={i} className={classes.item}>
          <div className="_thumbnail">
            <img role="presentation" className={classes.thumbnail} src={product.thumbnail.thumbnail_80_80} />
          </div>
          <div className="_nameAndSpec">
            {product.name}
          </div>
          <div className="_price">
            <small>单价：</small>
            {formatPrice(product.spec, false)}
            <br />
          </div>
          <div className="_quantity">
            <small>数量：</small>
            {`${quantity}${product.spec.unit}`}
          </div>
          <div className="_amount">
            <small>小计：</small>
            {`￥${quantity * product.spec.price}`}
          </div>
        </li>
      ))}
    </ul>
  </Card>
);

Order.propTypes = {
  classes: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
};

export default injectSheet({
  card: {
    width: '100%',
    minWidth: 0,
    minHeight: 0,
    marginBottom: 24,
  },
  thumbnail: {
    width: 40,
    height: 40,
  },
  items: {
    width: '100%',
    listStyle: 'none',
    margin: 0,
    padding: '0 24px',
  },
  item: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: 16,
    width: '100%',
    '& small': {
      color: colors.colorSubTitle,
    },
    '& > ._thumbnail': {
      marginRight: 16,
    },
    '& > ._nameAndSpec': {
      flex: 1,
      color: colors.colorSubTitle,
    },
    '& > ._price': {
      color: colors.colorPrice,
      width: 140,
    },
    '& > ._quantity': {
      width: 140,
    },
    '& > ._amount': {
      color: colors.colorPrice,
      width: 140,
    },
  },
})(Order);
