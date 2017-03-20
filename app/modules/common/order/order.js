import React, { PureComponent, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { productTypes } from 'appConstants';
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
    changeMessage: PropTypes.func,
    changeServices: PropTypes.func,
    changeServicesFee: PropTypes.func,
    changeDeliveryFee: PropTypes.func,
  }
  renderServices = () => {
    const { order, user, changeServices, changeServicesFee } = this.props;
    return (
      <Services
        order={order}
        user={user}
        onServiceChange={changeServices}
        onServiceFeeChange={changeServicesFee}
      />
    );
  }
  renderDelivery = () => {
    const { order, user, changeDeliveryFee } = this.props;
    const { address, type } = order;
    if (!address || type !== productTypes.shop) {
      return null;
    }
    return (
      <Delivery
        order={order}
        user={user}
        onChange={changeDeliveryFee}
      />
    );
  }
  renderMessageAndAmount = () => {
    const { order, user, changeMessage } = this.props;
    const { address } = order;
    if (!address) {
      return null;
    }
    return (
      <MessageAndAmount
        order={order}
        user={user}
        onMessageChange={changeMessage}
      />
    );
  }
  render() {
    const { order, user, classes } = this.props;
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
      />
    );
  }
}

export default injectSheet(moduleStyles)(Order);
