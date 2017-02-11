import React, { Component, PropTypes } from 'react';
import _groupBy from 'lodash/groupBy';
import _union from 'lodash/union';
import _without from 'lodash/without';
import _find from 'lodash/find';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import Button from 'react-mdl/lib/Button';
import Checkbox from 'react-mdl/lib/Checkbox';
import { cartItemsSelector } from 'modules/data/ducks/selectors';
import { isQuantityInvalid } from 'utils/validationUtils';
import { colors } from 'modules/common/styles';
import Header from './header';
import Group from './group';
import emptyCart from './assets/empty.png';
import layout from './layout';

class Page extends Component {
  static propTypes = {
    cartItems: PropTypes.array.isRequired,
  }
  constructor(props) {
    super(props);
    // copy every item since we are gonna change their quantity fileds
    this.state = { selected: [], cartItems: props.cartItems.map((item) => ({ ...item })) };
  }
  onItemsSelected = (itemIds) => {
    this.setState({ selected: _union(this.state.selected, itemIds) });
  }
  onItemsDeselected = (itemIds) => {
    this.setState({ selected: _without(this.state.selected, ...itemIds) });
  }
  onItemQuantityChange = (itemId, quantity) => {
    const item = _find(this.state.cartItems, (i) => i.objectId === itemId);
    item.quantity = quantity;
    this.setState({ cartItems: this.state.cartItems });
  }
  validate = () => {
    const { cartItems } = this.state;
    const error = {};
    cartItems.forEach(({ objectId, shopProduct, supplyProduct, specIndex, quantity }) => {
      const product = shopProduct || supplyProduct;
      const spec = product.specs[specIndex];
      const invalid = isQuantityInvalid(quantity);
      if (invalid) {
        error[objectId] = invalid;
      } else if (Number(quantity) < spec.minimum) {
        error[objectId] = `${spec.minimum}起售`;
      } else {
        delete error[objectId];
      }
    });
    return error;
  }
  render() {
    const { cartItems, selected } = this.state;
    const groups = Object.values(_groupBy(cartItems, (item) => item.owner.objectId));
    const error = this.validate();
    return (
      <div style={{ width: '100%' }}>
        <Header groups={groups} cartItems={cartItems} selected={selected} />
        {groups.map((group, i) => (
          <Group
            key={i}
            owner={group[0].owner}
            items={group}
            selected={selected}
            select={this.onItemsSelected}
            deselect={this.onItemsDeselected}
            onQuantityChange={this.onItemQuantityChange}
            error={error}
          />
        ))}
        {groups.length > 0 && (
          <div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  (state) => ({ cartItems: cartItemsSelector(state) })
)(Page);
