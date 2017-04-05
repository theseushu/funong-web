import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'react-mdl/lib/Button';
import { actions, selectors } from 'api/cart';

const RemoveItemsButton = ({ pending, removeItems, onItemsRemoved, cartItemIds }) => (
  <Button
    disabled={pending || cartItemIds.length === 0}
    onClick={(e) => {
      e.preventDefault();
      removeItems({
        cartItemIds,
        meta: {
          resolve: onItemsRemoved,
        },
      });
    }}
  >删除</Button>
);
RemoveItemsButton.propTypes = {
  pending: PropTypes.bool,
  removeItems: PropTypes.func.isRequired,
  onItemsRemoved: PropTypes.func.isRequired,
  cartItemIds: PropTypes.array.isRequired,
};

const { removeItems } = actions;
const removeItemsSelector = selectors.removeItems;

export default connect(
  (state) => removeItemsSelector(state),
  (dispatch) => bindActionCreators({ removeItems }, dispatch),
)(RemoveItemsButton);
