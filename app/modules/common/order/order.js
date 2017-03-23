import React, { PureComponent, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { orderFeeTypes } from 'appConstants';
import { stripOrder, calculateOrder } from 'utils/orderUtils';
import Layout from './layout';
import moduleStyles from './styles';
import Compact from './components/compact';
import Owner from './components/owner';
import Services from './components/services';
import Delivery from './components/delivery';
import Items from './components/items';
import MessageAndAmount from './components/messageAndAmount';

class Order extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    changeOrder: PropTypes.func,
    actions: PropTypes.any,
  }
  changeOrder = (order) => {
    const { changeOrder, user } = this.props;
    changeOrder(stripOrder(calculateOrder(order, user)));
  }
  renderServices = () => {
    const { order, user } = this.props;
    const { can } = order;
    if (!can.service) {
      return null;
    }
    return (
      <Services
        order={order}
        user={user}
        onServiceChange={can.requirements ? (services) => this.changeOrder({ ...order, services }) : undefined}
        onServiceFeeChange={(fee) => this.changeOrder({ ...order, fees: { ...order.fees, [orderFeeTypes.service.key]: fee } })}
      />
    );
  }
  renderDelivery = () => {
    const { order, user } = this.props;
    const { can } = order;
    if (!can.delivery) {
      return null;
    }
    return (
      <Delivery
        order={order}
        user={user}
        onChange={(fee) => this.changeOrder({ ...order, fees: { ...order.fees, [orderFeeTypes.delivery.key]: fee } })}
      />
    );
  }
  renderMessageAndAmount = () => {
    const { order, user } = this.props;
    const { address, can } = order;
    if (!address) {
      return null;
    }
    return (
      <MessageAndAmount
        order={order}
        user={user}
        onMessageChange={can.requirements ? (message) => this.changeOrder({ ...order, message }) : undefined}
        onDiscountChange={(discount) => {
          this.changeOrder({ ...order, fees: { ...order.fees, [orderFeeTypes.discount.key]: discount } });
        }}
      />
    );
  }
  render() {
    const { order, user, actions, classes } = this.props;
    const { type, items, address } = order;
    if (!address) {
      return (
        <Layout
          order={order}
          user={user}
          title={
            <Owner order={order} user={user} />
          }
          titleCompact={
            <Compact order={order} />
          }
          content={
            <div className={classes.content}>
              <Items type={type} items={items} />
            </div>
          }
          actions={actions}
        />
      );
    }
    return (
      <Layout
        order={order}
        user={user}
        title={
          <Owner order={order} user={user} />
        }
        titleCompact={
          <Compact order={order} />
        }
        content={
          <div className={classes.content}>
            <Items type={type} items={items} />
            {this.renderServices()}
            {this.renderDelivery()}
            {this.renderMessageAndAmount()}
          </div>
        }
        actions={actions}
      />
    );
  }
}

const Wrapped = ({ order, user, ...props }) => <Order order={order.can ? order : calculateOrder(order, user)} user={user} {...props} />;
Wrapped.propTypes = {
  order: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default injectSheet(moduleStyles)(Wrapped);
