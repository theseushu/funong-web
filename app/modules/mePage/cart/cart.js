import React, { Component, PropTypes } from 'react';
import _debounce from 'lodash/debounce';
import _filter from 'lodash/filter';
import _groupBy from 'lodash/groupBy';
import _union from 'lodash/union';
import _without from 'lodash/without';
import _find from 'lodash/find';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { cartItemsSelector } from 'modules/data/ducks/selectors';
import { actions } from 'api/cart';
import { isQuantityInvalid } from 'funong-common/lib/utils/validationUtils';
import { actions as pageActions } from './ducks';
import Header from './header';
import Group from './group';
import Bottom from './bottom';

class Page extends Component {
  static propTypes = {
    cartItems: PropTypes.array.isRequired,
    updateItem: PropTypes.func.isRequired,
    setItems: PropTypes.func.isRequired,
  }
  static contextTypes = {
    router: PropTypes.object.isRequired,
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
  onItemChange = (itemId, { quantity, specIndex }) => {
    const item = _find(this.state.cartItems, (i) => i.objectId === itemId);
    if (quantity != null) {
      item.quantity = quantity;
    }
    if (specIndex != null) {
      item.specIndex = specIndex;
    }
    this.setState({ cartItems: this.state.cartItems });
    const { updateItem } = this.props;
    updateItem({ objectId: itemId, quantity, specIndex });
  }
  onItemsRemoved = (itemIds) => {
    const { cartItems, selected } = this.state;
    this.setState({
      cartItems: _filter(cartItems, (item) => itemIds.indexOf(item.objectId) < 0),
      selected: _filter(selected, (selectedId) => itemIds.indexOf(selectedId) < 0),
    });
  }
  onOrder = (items) => {
    const { setItems } = this.props;
    const { router } = this.context;
    setItems(items);
    router.push('/order');
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
    const itemIds = cartItems.map((i) => i.objectId);
    const shopItems = Object.values(_filter(cartItems, (item) => !!item.shopProduct));
    const supplyItems = Object.values(_filter(cartItems, (item) => !!item.supplyProduct));
    const shopGroups = Object.values(_groupBy(shopItems, (item) => item.shopProduct.shop.objectId));
    const supplyGroups = Object.values(_groupBy(supplyItems, (item) => item.supplyProduct.owner.objectId));
    const error = this.validate();
    return (
      <div style={{ width: '100%' }}>
        <Header
          cartItems={cartItems}
          selected={selected}
          onSelect={() => this.onItemsSelected(itemIds)}
          onDeselect={() => this.onItemsDeselected(itemIds)}
        />
        {shopGroups.map((group, i) => (
          <Group
            key={i}
            shop={group[0].shopProduct.shop}
            items={group}
            selected={selected}
            select={this.onItemsSelected}
            deselect={this.onItemsDeselected}
            onItemChange={this.onItemChange}
            onItemsRemoved={this.onItemsRemoved}
            error={error}
          />
        ))}
        {supplyGroups.map((group, i) => (
          <Group
            key={i}
            owner={group[0].supplyProduct.owner}
            items={group}
            selected={selected}
            select={this.onItemsSelected}
            deselect={this.onItemsDeselected}
            onItemChange={this.onItemChange}
            onItemsRemoved={this.onItemsRemoved}
            error={error}
          />
        ))}
        <Bottom
          cartItems={cartItems}
          selected={selected}
          error={error}
          onSelect={() => this.onItemsSelected(itemIds)}
          onDeselect={() => this.onItemsDeselected(itemIds)}
          onItemsRemoved={this.onItemsRemoved}
          onOrder={this.onOrder}
        />
      </div>
    );
  }
}

const { updateItem } = actions;
const { setItems } = pageActions;

export default connect(
  (state) => ({ cartItems: cartItemsSelector(state) }),
  (dispatch) => {
    const actionCreators = bindActionCreators({ updateItem, setItems }, dispatch);
    const debouncedUpdateItem = _debounce(actionCreators.updateItem, 2000);
    return { ...actionCreators, updateItem: debouncedUpdateItem };
  },
)(Page);
