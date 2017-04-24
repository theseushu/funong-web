import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { formatPrice } from 'funong-common/lib/utils/displayUtils';
import { colors, breakpoints } from 'modules/common/styles';
import { Thumbnail } from 'modules/common/product';
import { layouts } from '../styles';

const Items = ({ type, items, classes }) => (
  <ul className={classes.items}>
    {items.map(({ quantity, product }, i) => (
      <li key={i} className={classes.item}>
        <div className="_left">
          <Thumbnail className="_thumbnail" type={type} thumbnail={product.thumbnail} />
        </div>
        <div className="_center">
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
  type: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  items: {
    width: '100%',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  item: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 16,
    '& > ._left': {
      order: 1,
    },
    '& > ._center': {
      order: 2,
      flex: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '& > ._right': {
      order: 3,
      width: layouts.right,
      display: 'flex',
      '& > div': {
        flex: 1,
      },
    },
    '& small': {
      color: colors.colorSubTitle,
    },
    '& ._thumbnail': {
      marginRight: 16,
      width: 80,
      height: 80,
      '& i': {
        fontSize: 80,
      },
    },
    '& ._nameAndSpec': {
      flex: 1,
      color: colors.colorSubTitle,
    },
    '& ._price': {
      color: colors.colorSubPrice,
    },
    '& ._quantity': {
    },
    '& ._amount': {
      color: colors.colorSubPrice,
    },
    [breakpoints.mediaDestkopBelow]: {
      flexWrap: 'wrap',
      '& > ._center': {
        flex: 'none',
        order: 4,
        width: '100%',
      },
      '& > ._right': {
        order: 3,
        width: 'auto',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        '& > div': {
          width: '100%',
        },
      },
    },
  },
})(Items);
