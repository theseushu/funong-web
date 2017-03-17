import React, { PureComponent, PropTypes } from 'react';
import _find from 'lodash/find';
import injectSheet from 'react-jss';
import { Card, CardTitle, CardMenu } from 'react-mdl/lib/Card';
import IconButton from 'react-mdl/lib/IconButton';
import { productTypes, serviceTypes, orderFeeTypes } from 'appConstants';
import styles, { colors } from 'modules/common/styles';
import Compact from './components/compact';
import Owner from './components/owner';
import Items from './components/items';
import Services from './components/services';
import Delivery from './components/delivery';
import MessageAndAmount from './components/messageAndAmount';

class Order extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    changeMessage: PropTypes.func.isRequired,
    changeServices: PropTypes.func.isRequired,
    changeServicesFee: PropTypes.func.isRequired,
    changeDeliveryFee: PropTypes.func.isRequired,
  }
  state = { compact: false }
  render() {
    const { order: { type, user, shop, items, productAmount, services, delivery, otherFees, message },
      changeServices, changeServicesFee, changeMessage, changeDeliveryFee, classes } = this.props;
    const { compact } = this.state;
    // services
    const availableServices = serviceTypes[type];
    let orderServices;
    if (type === productTypes.shop) {
      orderServices = shop.services || [];
    } else {
      orderServices = user.services[type] || [];
    }
    orderServices = orderServices.map(({ value, charge }) => {
      const service = _find(availableServices, (s) => value === s.value);
      return { ...service, charge, checked: !!_find(services, (s) => s.value === service.value) };
    });
    const serviceFee = otherFees[orderFeeTypes.service.key];
    const deliveryFee = otherFees[orderFeeTypes.delivery.key];
    if (compact) {
      return (
        <Card shadow={0} className={`${classes.card} ${styles.defaultTransition}`}>
          <CardMenu>
            <IconButton name="vertical_align_bottom" onClick={() => this.setState({ compact: false })} />
          </CardMenu>
          <CardTitle>
            <Compact order={this.props.order} />
          </CardTitle>
        </Card>
      );
    }
    return (
      <Card shadow={0} className={`${classes.card} ${styles.defaultTransition}`}>
        <CardMenu>
          <IconButton name="vertical_align_top" onClick={() => this.setState({ compact: true })} />
        </CardMenu>
        <CardTitle>
          <Owner user={user} shop={shop} />
        </CardTitle>
        <div className={classes.content}>
          <Items items={items} classes={classes} />
          <Services
            services={orderServices}
            serviceFee={serviceFee}
            classes={classes}
            onServiceChange={(checked, value, charge) => {
              let newServices = [...services];
              if (checked) {
                newServices = [{ value, charge }, ...newServices];
              } else {
                newServices = newServices.filter((s) => s.value !== value);
              }
              changeServices(newServices);
            }}
            onServiceFeeChange={changeServicesFee}
          />
          { delivery && (
            <Delivery
              classes={classes} delivery={delivery} productAmount={productAmount} deliveryFee={deliveryFee}
              onDeliveryFeeChange={changeDeliveryFee}
            />
          )}
          <MessageAndAmount
            message={message}
            onChange={changeMessage}
            order={this.props.order}
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
