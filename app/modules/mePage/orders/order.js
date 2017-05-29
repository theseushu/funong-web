import React, { Component, PropTypes } from 'react';
import _isEuqal from 'lodash/isEqual';
import Button from 'react-mdl/lib/Button';
import { calculateOrder } from 'funong-common/lib/utils/orderUtils';
import Order from 'modules/common/order';
import CommitButton from './commitButton';

class StatefulOrder extends Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }
  componentWillMount() {
    const { order, user } = this.props;
    this.setState({ order: calculateOrder(order, user) });
  }
  commitButton = () => {
    const { user } = this.props;
    const { order } = this.state;
    return (
      <CommitButton
        key={0}
        order={order}
        changed={this.changed()}
        onSuccess={(o) => {
          this.setState({ order: calculateOrder(o, user) });
        }}
      />
    );
  }
  resetButton = () => {
    const { order, user } = this.props;
    return (
      <Button
        key={1}
        disabled={!this.changed()}
        onClick={() => this.setState({ order: calculateOrder(order, user) })}
      >重置</Button>
    );
  }
  changed = () => {
    const { order } = this.state;
    const changed = false;
    const { services, message, fees, amount } = order;
    if (!_isEuqal(services, this.props.order.services)) {
      return true;
    }
    if (!_isEuqal(message, this.props.order.message)) {
      return true;
    }
    if (!_isEuqal(fees, this.props.order.fees)) {
      return true;
    }
    if (!_isEuqal(amount, this.props.order.amount)) {
      return true;
    }
    return changed;
  }
  render() {
    const { user } = this.props;
    const { order } = this.state;
    const { can: { requirements, fees, amount, commit } } = order;
    const buttons = [];
    if (commit) {
      buttons.push(this.commitButton());
    }
    if (requirements || fees || amount) {
      buttons.push(this.resetButton());
    }
    return (
      <Order
        order={order}
        user={user}
        changeOrder={(o) => this.setState({ order: calculateOrder(o, user) })}
        actions={buttons.length > 0 && buttons}
        compact
      />
    );
  }
}

export default StatefulOrder;
