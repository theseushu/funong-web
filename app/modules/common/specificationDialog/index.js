import React, { Component, PropTypes } from 'react';
import _without from 'lodash/without';
import _orderBy from 'lodash/orderBy';
import SpecDialog from './dialog';
import PriceDialog from './priceDialog';

class SpecificationsSelectorDialog extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    specification: PropTypes.object,
    isDefault: PropTypes.bool.isRequired,
  }
  constructor(props) {
    super(props);
    const { specification = { name: props.isDefault ? '默认' : '', params: [], prices: [] } } = this.props;
    console.log(specification)
    this.state = { specification, editingPriceIndex: null, newParam: '' };
  }
  onSpecNameChanged = (e) => {
    const { specification } = this.state;
    this.setState({ specification: { ...specification, name: e.target.value } });
  }
  onNewParamChanged = (e) => {
    this.setState({ newParam: e.target.value });
  }
  onPriceSubmit = (price) => {
    const { editingPriceIndex, specification } = this.state;
    const prices = [...specification.prices];
    if (editingPriceIndex < 0) {
      prices.push(price);
    } else {
      prices[editingPriceIndex] = price;
    }
    const sorted = _orderBy(prices, ['minCount']);
    this.setState({ specification: { ...specification, prices: sorted }, editingPriceIndex: null });
  }
  addSpecParam = (e) => {
    e.preventDefault();
    const newParam = this.state.newParam.trim();
    const { specification } = this.state;
    this.setState({ newParam: '', specification: { ...specification, params: [...specification.params, newParam] } });
  }
  removeSpecParam = (param) => {
    const { specification } = this.state;
    this.setState({ specification: { ...specification, params: _without(specification.params, param) } });
  }
  editPrice = (i) => {
    this.setState({ editingPriceIndex: i });
  }
  removePrice = (index) => {
    const { specification } = this.state;
    this.setState({ specification: { ...specification, prices: _without(specification.prices, specification.prices[index]) } });
  }
  render() {
    const { editingPriceIndex, specification, newParam } = this.state;
    const { onSubmit, close } = this.props;
    const title = this.props.specification ? '修改规格' : '添加新规格';
    if (editingPriceIndex === null) {
      return (
        <SpecDialog
          isDefault={this.props.isDefault}
          close={close}
          title={title}
          onSubmit={onSubmit}
          newParam={newParam}
          onSpecNameChanged={this.onSpecNameChanged}
          onNewParamChanged={this.onNewParamChanged}
          addSpecParam={this.addSpecParam}
          removeSpecParam={this.removeSpecParam}
          specification={specification}
          editPrice={this.editPrice}
          removePrice={this.removePrice}
        />
      );
    }
    return (
      <PriceDialog
        title={title}
        price={specification.prices[editingPriceIndex]}
        specification={specification}
        onPriceSubmit={this.onPriceSubmit}
        index={editingPriceIndex}
        onCancel={() => this.setState({ editingPriceIndex: null })}
      />
    );
  }
}

export default SpecificationsSelectorDialog;
