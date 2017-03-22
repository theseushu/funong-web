import React, { Component, PropTypes } from 'react';
import _isEuqal from 'lodash/isEqual';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'react-mdl/lib/Button';
import ApiButtonWithIcon from 'modules/common/buttons/ApiButtonWithIcon';
import { orderFeeTypes } from 'appConstants';
import { actions, selectors } from 'api/order';
import { editableFields, isOrderConfirmable, isOrderTobeConfirmed, calculateOrder } from 'utils/orderUtils';
import Order from 'modules/common/order';

class StatefulOrder extends Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired,
    updateState: PropTypes.object,
    confirmState: PropTypes.object,
  }
  componentWillMount() {
    this.setState({ order: { ...this.props.order } });
  }
  updateButton = () => {
    const { update, updateState } = this.props;
    const changed = this.changed();
    return (
      <ApiButtonWithIcon
        colored
        icon="save"
        pending={updateState ? updateState.pending : false}
        disabled={Object.keys(changed).length === 0}
        onClick={() => update({ order: this.props.order, ...changed })}
      >确定修改</ApiButtonWithIcon>
    );
  }
  confirmButton = () => {
    const { user, confirm, confirmState } = this.props;
    const changed = this.changed();
    return (
      <ApiButtonWithIcon
        colored
        icon="save"
        pending={confirmState ? confirmState.pending : false}
        disabled={isOrderConfirmable({ order: this.props.order, ...changed }, user)}
        onClick={() => confirm({ order: this.props.order, ...changed })}
      >确定订单</ApiButtonWithIcon>
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
    const editable = editableFields(order, user);
    const methods = {};
    if (editable.requirements) {
      methods.changeMessage = this.changeMessage;
      methods.changeServices = this.changeServices;
    }
    if (editable.fees) {
      methods.changeServicesFee = this.changeServicesFee;
      methods.changeDeliveryFee = this.changeDeliveryFee;
    }
    if (editable.amount) {
      methods.changeAmount = this.changeAmount;
    }
    return (
      <Order
        order={order}
        user={user}
        changeOrder={(o) => this.setState({ order: o })}
        actions={
          Object.keys(methods).length > 0 && (
            <div style={{ width: '100%', textAlign: 'right' }}>
              {isOrderTobeConfirmed(order, user) ? this.confirmButton() : this.updateButton()}
              <Button colored onClick={() => this.setState({ order: this.props.order })}>取消</Button>
            </div>
          )
        }
      />
    );
  }
}

const updateAction = actions.update;
const updateSelector = selectors.update;
const confirmAction = actions.confirm;
const confirmSelector = selectors.confirm;

export default connect(
  (state) => ({ updateState: updateSelector(state), confirmState: confirmSelector(state) }),
  (dispatch) => bindActionCreators({ update: updateAction, confirm: confirmAction }, dispatch),
)(StatefulOrder);
