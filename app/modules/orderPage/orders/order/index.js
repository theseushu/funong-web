import React, { PureComponent, PropTypes } from 'react';
import _find from 'lodash/find';
import _reduce from 'lodash/reduce';
import _filter from 'lodash/filter';
import injectSheet from 'react-jss';
import { Card, CardTitle } from 'react-mdl/lib/Card';
import { serviceTypes } from 'appConstants';
import { colors } from 'modules/common/styles';
import Owner from './owner';
import Items from './items';
import Services from './services';
import MessageAndAmount from './messageAndAmount';

class Order extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    address: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }
  onChange = ({ ...params }) => {
    const { order, onChange } = this.props;
    onChange({ ...order, ...params });
  }
  render() {
    const { order: { owner, shop, items, services, addtionalFee, message }, classes } = this.props;
    const amount = _reduce(items, (sum, { quantity, product: { spec } }) => sum + (quantity * spec.price), 0);
    const ownerServices = (owner && owner.services) || (shop && shop.services);
    const selectedServices = _filter(ownerServices, (service) => services.indexOf(service.value) > -1);
    const chargedService = _filter(selectedServices, (service) => service.charge);
    return (
      <Card shadow={0} className={classes.card}>
        <CardTitle>
          <Owner user={owner} shop={shop} />
        </CardTitle>
        <div className={classes.content}>
          <Items items={items} classes={classes} />
          { (owner && owner.services.length > 0) && (
            <Services classes={classes} order={this.props.order} onChange={this.onChange} />
          )}
          <MessageAndAmount
            message={message}
            onChange={this.onChange}
            productAmount={amount}
            addtionalFees={
              chargedService.length !== 0 ? [
                { title: '附加费用', value: addtionalFee, desc: chargedService.map(({ value }) => _find(serviceTypes, (type) => type.value === value).title).join(',') },
              ] : []
            }
            classes={classes}
          />
        </div>
      </Card>
    );
  }
}

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
  content: {
    padding: '0 24px',
  },
  items: {
    width: '100%',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  line: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    '& > ._left': {
      flex: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '& > ._right': {
      width: 420,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '& small': {
      color: colors.colorSubTitle,
    },
  },
  item: {
    marginBottom: 16,
    '& ._thumbnail': {
      marginRight: 16,
    },
    '& ._nameAndSpec': {
      flex: 1,
      color: colors.colorSubTitle,
    },
    '& ._price': {
      color: colors.colorSubPrice,
      width: 140,
    },
    '& ._quantity': {
      width: 140,
    },
    '& ._amount': {
      color: colors.colorSubPrice,
      width: 140,
    },
  },
  services: {
    color: colors.colorSubTitle,
    '& ._info': {
      flex: 1,
      paddingRight: 16,
    },
    '& ._amount': {
      color: colors.colorSubPrice,
      width: 140,
    },
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
  },
  message: {
    width: '100%',
    minWidth: 0,
    maxWidth: '100%',
    marginRight: 24,
  },
  amount: {
    paddingTop: 24,
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    color: colors.colorPrice,
    '& > div': {
      width: 180,
    },
  },
})(Order);
