import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import ApiButton from 'modules/common/buttons/ApiButtonWithIcon';
import { actions, selectors } from 'api/bid';

class WithDrawBidButton extends Component {
  static propTypes = {
    user: PropTypes.object,
    bid: PropTypes.object.isRequired,
    pending: PropTypes.bool,
    withdraw: PropTypes.func.isRequired,
    onWithdrawn: PropTypes.func,
  }
  state = { bidding: false }
  render() {
    const { bid, user, withdraw, onWithdrawn, pending } = this.props;
    return (
      <span>
        <ApiButton
          icon="delete"
          ripple
          pending={pending}
          disabled={pending || !user || user.objectId !== bid.owner.objectId}
          onClick={(e) => {
            e.preventDefault();
            withdraw({
              objectId: bid.objectId,
              meta: {
                storeKey: bid.objectId,
                resolve: () => {
                  if (onWithdrawn) {
                    onWithdrawn();
                  }
                },
              },
            });
          }}
        >撤销</ApiButton>
      </span>
    );
  }
}

const withdraw = actions.withdraw;
const withdrawSelector = selectors.withdraw;

export default connect(
  (state, { bid }) => ({ user: currentUserSelector(state), ...withdrawSelector(state)[bid.objectId] }),
  (dispatch) => bindActionCreators({ withdraw }, dispatch),
)(WithDrawBidButton);
