import React, { PropTypes } from 'react';
import { formatPrice } from 'utils/displayUtils';

const Items = ({ items, classes }) => (
  <ul className={classes.items}>
    {items.map(({ quantity, product }, i) => (
      <li key={i} className={`${classes.line} ${classes.item}`}>
        <div className="_left">
          <div className="_thumbnail">
            <img role="presentation" className={classes.thumbnail} src={product.thumbnail.thumbnail_80_80} />
          </div>
          <div className="_nameAndSpec">
            {product.name}
          </div>
        </div>
        <div className="_right">
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
        </div>
      </li>
    ))}
  </ul>
);
Items.propTypes = {
  items: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default Items;
