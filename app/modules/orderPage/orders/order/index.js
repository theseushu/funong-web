import React, { PropTypes } from 'react';
import _find from 'lodash/find';
import _reduce from 'lodash/reduce';
import injectSheet from 'react-jss';
import Checkbox from 'react-mdl/lib/Checkbox';
import { Card, CardTitle } from 'react-mdl/lib/Card';
import Textfield from 'react-mdl/lib/Textfield';
import { formatPrice } from 'utils/displayUtils';
import styles, { colors } from 'modules/common/styles';
import { serviceTypes } from 'appConstants';
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
    { owner && (
      <div className={classes.services}>
        <small>卖家提供以下服务</small>
        <div className={classes.checkboxes}>
          {
            owner.services.map(({ value, charge }, i) => {
              const serviceType = _find(serviceTypes, (type) => type.value === value);
              return (
                <div key={i}>
                  <Checkbox label={serviceType.title} />
                  { charge && <small className={styles.colorPrice}>(单独收费)</small>}
                </div>
              );
            })
          }
        </div>
      </div>
    )}
    <div className={classes.messages}>
      <div className={classes.message}>
        <Textfield
          label="给卖家留言"
          rows={3}
        />
      </div>
      <div className={classes.info}>
        <div className={classes.amount}>
          <small>合计：</small>
          {_reduce(items, (sum, { quantity, product: { spec } }) => sum + (quantity * spec.price), 0)}
          <small> (不含运费)</small>
        </div>
      </div>
    </div>
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
  services: {
    padding: '0 16px',
    color: colors.colorSubTitle,
  },
  checkboxes: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      marginRight: 16,
      '& > .mdl-checkbox': {
        width: 'auto',
      },
    },
  },
  messages: {
    padding: '0 16px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  message: {
    width: 300,
    minWidth: 'none',
    maxWidth: '100%',
  },
  info: {
    flex: 1,
    paddingTop: 16,
  },
  amount: {
    textAlign: 'center',
    color: colors.colorPrice,
  },
})(Order);
