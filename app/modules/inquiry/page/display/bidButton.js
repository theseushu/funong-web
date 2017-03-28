import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import ApiButton from 'modules/common/buttons/ApiButtonWithIcon';
import { actions, selectors } from 'api/bid';
import { Dialog as BidDialog } from 'modules/common/bid';

class Bid extends Component {
  static propTypes = {
    user: PropTypes.object,
    inquiry: PropTypes.object.isRequired,
    pending: PropTypes.bool,
    create: PropTypes.func.isRequired,
  }
  state = { bidding: false }
  render() {
    const { inquiry, user, create, pending } = this.props;
    return (
      <div>
        <ApiButton
          icon="note_add"
          ripple raised accent
          pending={pending}
          disabled={pending}
          onClick={() => {
            if (!user) {
              // todo redirect to login
            }
            this.setState({ bidding: true });
          }}
        >报 价</ApiButton>
        { this.state.bidding && (
          <BidDialog
            show
            close={() => this.setState({ bidding: false })}
            species={inquiry.species}
            user={user}
            onSubmit={(bid) => {
              this.setState({ bidding: false });
              create({ ...bid, inquiry });
            }}
          />
        )}
      </div>
    );
  }
}

const create = actions.create;
const createSelector = selectors.create;

export default connect(
  (state) => ({ user: currentUserSelector(state), ...createSelector(state) }),
  (dispatch) => bindActionCreators({ create }, dispatch),
)(Bid);
