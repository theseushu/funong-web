import React, { Component, PropTypes } from 'react';
import _omitBy from 'lodash/omitBy';
import _isUndefined from 'lodash/isUndefined';
import Textfield from 'react-mdl/lib/Textfield';
import Button from 'react-mdl/lib/Button';
import { publishTypes } from 'funong-common/lib/appConstants';
import styles from 'modules/common/styles';
import { SimpleDialog as Dialog } from 'modules/common/dialog';
import PublishSelector from 'modules/publishSelector';
import InlineThumbnail from 'modules/common/publishes/inlineThumbnail';

class BidDialog extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    species: PropTypes.object,
    user: PropTypes.object,
    bid: PropTypes.object,
  };
  state = { price: '', quantity: '', product: null, message: '', showProduct: false };
  componentWillMount() {
    const { bid } = this.props;
    if (bid) {
      const { price, quantity, product, message } = bid;
      this.setState({ price, quantity, product, message });
    }
  }
  onPriceChange = (e) => {
    this.setState({ price: e.target.value });
  }
  onQuantityChange = (e) => {
    this.setState({ quantity: e.target.value });
  }
  onMessageChange = (e) => {
    this.setState({ message: e.target.value });
  }
  submit = () => {
    const { price, quantity, product, message } = this.state;
    this.props.onSubmit({ price, quantity, product, message });
  }
  validate = () => {
    const error = {};
    const { price, quantity } = this.state;
    if (!price.trim()) {
      error.price = '必填';
    }
    if (!quantity.trim()) {
      error.quantity = '必填';
    }
    return error;
  }
  render() {
    const { bid = {}, user, species, close, show } = this.props;
    const { price, quantity, product, message, showProduct } = this.state;
    const error = this.validate();
    return (
      <Dialog
        show={show}
        onHide={close}
        onCancel={close}
        title={'报价'}
        content={
          <div>
            <Textfield
              className={styles.w100}
              label="价格"
              name="_bid_price"
              floatingLabel
              value={price}
              error={error.price}
              onChange={this.onPriceChange}
            />
            <Textfield
              className={styles.w100}
              label="供应量"
              name="_bid_quantity"
              floatingLabel
              value={quantity}
              error={error.quantity}
              onChange={this.onQuantityChange}
            />
            <Textfield
              className={styles.w100}
              label="留言"
              name="_bid_message"
              floatingLabel
              rows={3}
              value={message}
              onChange={this.onMessageChange}
            />
            <div>
              <Button colored onClick={() => this.setState({ showProduct: !showProduct })}>
                {!showProduct && !product && '推荐我的产品'}
                {!showProduct && product && '推荐其它产品'}
                {showProduct && '收起列表'}
              </Button>
              { product && <span><InlineThumbnail type={publishTypes.supply} thumbnail={product.thumbnail} />{product.name}</span>}
            </div>
            { showProduct && (
              <PublishSelector
                type={publishTypes.supply}
                query={_omitBy({ owner: user, species: species && [species] }, _isUndefined)}
                selected={product ? [product] : undefined}
                onSelect={(products) => {
                  const p = products[0] || null;
                  this.setState({ product: p, showProduct: !p });
                }}
              />
              )}
          </div>
        }
        submit={{
          onSubmit: (e) => {
            e.preventDefault();
            this.submit({
              ...bid,
              price: price.trim(),
              quantity: quantity.trim(),
              message: message.trim(),
              product,
            });
          },
          disabled: Object.keys(error).length > 0,
        }}
      />
    );
  }
}

export default BidDialog;
