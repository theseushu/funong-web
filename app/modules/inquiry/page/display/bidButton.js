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
    location: PropTypes.object.isRequired,
    pending: PropTypes.bool,
    create: PropTypes.func.isRequired,
  }
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }
  state = { bidding: false }
  render() {
    const { inquiry, user, location, create, pending } = this.props;
    const { router } = this.context;
    if (user && inquiry.owner.objectId === user.objectId) {
      return null;
    }
    return (
      <div>
        <ApiButton
          icon="note_add"
          ripple raised accent
          pending={pending}
          disabled={pending}
          onClick={() => {
            if (!user) {
              router.push(`/login?redirect=${location.pathname}${location.query}`);
            } else {
              this.setState({ bidding: true });
            }
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
