import React, { Component, PropTypes } from 'react';
import _isEuqal from 'lodash/isEqual';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'react-mdl/lib/Button';
import ApiButtonWithIcon from 'modules/common/buttons/ApiButtonWithIcon';
import { actions, selectors } from 'api/order';
import { calculateOrder, stripOrder, commitButtonName } from 'utils/orderUtils';
import Order from 'modules/common/order';

class StatefulOrder extends Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    commit: PropTypes.func.isRequired,
    commitState: PropTypes.object,
  }
  componentWillMount() {
    const { order, user } = this.props;
    this.setState({ order: calculateOrder(order, user) });
  }
  commitButton = () => {
    const { commit, commitState } = this.props;
    const { order: { can } } = this.state;
    return (
      <ApiButtonWithIcon
        key={0}
        colored
        icon="save"
        pending={commitState ? commitState.pending : false}
        disabled={!can.commit.available}
        onClick={() => commit({ order: stripOrder(this.state.order) })}
      >{commitButtonName(can.commit.to)}</ApiButtonWithIcon>
    );
  }
  resetButton = () => {
    const { order, user } = this.props;
    return (
      <Button
        key={1}
        onClick={() => this.setState({ order: calculateOrder(order, user) })}
      >重置</Button>
    );
  }
  changed = () => {
    const { order } = this.state;
    const changed = {};
    const { services, message, fees, amount } = order;
    if (!_isEuqal(services, this.props.order.services)) {
      changed.services = services;
    }
    if (!_isEuqal(message, this.props.order.message)) {
      changed.message = message;
    }
    if (!_isEuqal(fees, this.props.order.fees)) {
      changed.fees = fees;
    }
    if (!_isEuqal(amount, this.props.order.amount)) {
      changed.amount = amount;
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
      />
    );
  }
}

const commitAction = actions.commit;
const commitSelector = selectors.commit;

export default connect(
  (state) => ({ commitState: commitSelector(state) }),
  (dispatch) => bindActionCreators({ commit: ({ order, meta = {} }) => commitAction({ order, meta: { ...meta, storeKey: order.objectId } }) }, dispatch),
)(StatefulOrder);
