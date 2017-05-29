import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import styles, { colors } from 'modules/common/styles';
import InlineThumbnail from 'modules/common/publishes/inlineThumbnail';

const Compact = ({ order, classes }) => {
  const { amount } = order;
  return (
    <div className={classes.compact}>
      <div className={classes.products}>
        {order.items.map((item, i) => (
          <span key={i}>
            <InlineThumbnail type={order.type} thumbnail={item.product.thumbnail} />
            <small>{` ${item.product.name}`}</small>
          </span>
        ))}
      </div>
      <div className={classes.amount}>
        <span>{amount === -1 ? '待议' : `￥${amount}`}</span>
        <small className={styles.colorSubTitle}>(总价)</small>
      </div>
    </div>
  );
};

Compact.propTypes = {
  order: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  compact: {
    display: 'flex',
    alignItems: 'center',
    color: colors.colorSubTitle,
    lineHeight: '32px', // to align with cardMenu button
  },
  products: {
    flex: '1',
    display: 'flex',
    flexWrap: 'wrap',
    '& > span': {
      maxWidth: '10em',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      marginRight: 16,
    },
  },
  amount: {
    color: colors.colorPrice,
  },
})(Compact);
