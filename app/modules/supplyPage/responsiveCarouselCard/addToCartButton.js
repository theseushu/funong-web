import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import Button from 'react-mdl/lib/Button';
import success from 'modules/toastr/success';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { actions, selectors } from 'api/cart';

const { addItem } = actions;
const addCartItemStateSelector = selectors.addItem;

const ToastrLink = () => <Link to="/cart">去购物车</Link>;

const AddToCartButton = ({ currentUser, pending, addCartItem, shopProduct, supplyProduct, specIndex, quantity }) => (
  <Button
    raised accent ripple disabled={pending}
    onClick={(e) => {
      e.preventDefault();
      if (currentUser) {
        addCartItem({
          shopProduct,
          supplyProduct,
          quantity,
          specIndex,
          meta: {
            resolve: () => {
              const image = (shopProduct && shopProduct.thumbnail.thumbnail_80_80) || (supplyProduct && supplyProduct.thumbnail.thumbnail_80_80);
              success({
                icon: <img role="presentation" width="70" height="70" src={image} />,
                title: '加入成功',
                message: '您可以在购物车中查看',
                extra: <ToastrLink />,
              });
            },
          } });
      } else {
        // todo prompt login
        console.error('no user, no cart'); // eslint-disable-line
      }
    }}
  >加入购物车</Button>
);
AddToCartButton.propTypes = {
  currentUser: PropTypes.object,
  pending: PropTypes.bool,
  addCartItem: PropTypes.func.isRequired,
  shopProduct: PropTypes.object,
  supplyProduct: PropTypes.object,
  quantity: PropTypes.number,
  specIndex: PropTypes.number.isRequired,
};

export default connect(
  (state) => ({ ...addCartItemStateSelector(state), currentUser: currentUserSelector(state) }),
  (dispatch) => bindActionCreators({ addCartItem: addItem }, dispatch),
)(AddToCartButton);
