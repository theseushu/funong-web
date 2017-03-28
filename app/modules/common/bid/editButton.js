import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import ApiButton from 'modules/common/buttons/ApiButtonWithIcon';
import { actions, selectors } from 'api/bid';
import BidDialog from './dialog';

class Bid extends Component {
  static propTypes = {
    user: PropTypes.object,
    bid: PropTypes.object.isRequired,
    pending: PropTypes.bool,
    update: PropTypes.func.isRequired,
  }
  state = { bidding: false }
  render() {
    const { bid, user, update, pending } = this.props;
    return (
      <span>
        <ApiButton
          icon="edit"
          ripple
          colored
          pending={pending}
          disabled={pending || !user || user.objectId !== bid.owner.objectId}
          onClick={() => {
            this.setState({ bidding: true });
          }}
        >修改</ApiButton>
        { this.state.bidding && (
          <BidDialog
            show
            close={() => this.setState({ bidding: false })}
            bid={bid}
            species={bid.inquiry.species}
            user={user}
            onSubmit={(b) => {
              this.setState({ bidding: false });
              update({ bid, ...b });
            }}
          />
        )}
      </span>
    );
  }
}

const update = actions.update;
const updateSelector = selectors.update;

export default connect(
  (state) => ({ user: currentUserSelector(state), ...updateSelector(state) }),
  (dispatch) => bindActionCreators({ update }, dispatch),
)(Bid);
