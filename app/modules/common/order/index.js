import React, { PureComponent, PropTypes } from 'react';
import _find from 'lodash/find';
import injectSheet from 'react-jss';
import { Card, CardTitle, CardMenu } from 'react-mdl/lib/Card';
import IconButton from 'react-mdl/lib/IconButton';
import { statusValues, productTypes, serviceTypes, orderFeeTypes } from 'appConstants';
import styles, { colors } from 'modules/common/styles';
import Compact from './components/compact';
import Menu from './menu';
import Title from './title';
import Items from './items';
import Services from './components/services';
import Delivery from './components/delivery';
import MessageAndAmount from './components/messageAndAmount';

class Order extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    editable: PropTypes.shape({
      message: PropTypes.func,
      services: PropTypes.func,
      servicesFee: PropTypes.func,
      deliveryFee: PropTypes.func,
    }),
    changeMessage: PropTypes.func,
    changeServices: PropTypes.func,
    changeServicesFee: PropTypes.func,
    changeDeliveryFee: PropTypes.func,
    compact: PropTypes.bool,
  }
  static defaultProps = {
    compact: true,
    editable: {},
  }
  componentWillMount() {
    this.setState({ compact: this.props.compact });
  }
  render() {
    const { order: { type, user, shop, items, productAmount, services, delivery, otherFees, message, status },
      editable, classes } = this.props;
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
            <Menu onClick={() => this.setState({ compact: !compact })} status={status} isCompact={compact} />
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
          <Menu onClick={() => this.setState({ compact: !compact })} status={status} isCompact={compact} />
        </CardMenu>
        <CardTitle>
          <Title user={user} shop={shop} />
        </CardTitle>
        <div className={classes.content}>
          <Items type={type} items={items} classes={classes} />
          <Services
            services={orderServices}
            serviceFee={serviceFee}
            classes={classes}
            onServiceChange={editable.services ? (checked, value, charge) => {
              let newServices = [...services];
              if (checked) {
                newServices = [{ value, charge }, ...newServices];
              } else {
                newServices = newServices.filter((s) => s.value !== value);
              }
              editable.services(newServices);
            } : null}
            onServiceFeeChange={editable.servicesFee}
          />
          { delivery && (
            <Delivery
              classes={classes} delivery={delivery} productAmount={productAmount} deliveryFee={deliveryFee}
              onDeliveryFeeChange={editable.deliveryFee}
            />
          )}
          <MessageAndAmount
            message={message}
            onChange={editable.message}
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
