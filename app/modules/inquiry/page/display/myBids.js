import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { Page } from 'modules/common/bid';
import BlockLoading from 'modules/common/glossary/blockLoading';
import { actions, selectors } from '../ducks';

class Bids extends Component {
  static propTypes = {
    search: PropTypes.func.isRequired,
    inquiry: PropTypes.object.isRequired,
    user: PropTypes.object,
    pending: PropTypes.bool,
    result: PropTypes.object,
  }
  componentDidMount() {
    const { inquiry, user, search } = this.props;
    if (user) {
      search({ inquiry, owner: user });
    }
  }
  render() {
    const { user, pending, result } = this.props;
    if (!user) {
      return null;
    }
    if (pending) {
      return <BlockLoading />;
    }
    if (!result || result.total === 0) {
      return null;
    }
    return (
      <div>
        <h6>我的报价</h6>
        <Page page={result} hideUser actions={['edit', 'withdraw']} />
      </div>
    );
  }
}

const pageBids = actions.pageMyBids;
const pageBidsSelector = selectors.pageMyBids;

export default injectSheet({
})(connect(
  (state) => ({ user: currentUserSelector(state), ...pageBidsSelector(state) }),
  (dispatch) => bindActionCreators({ search: pageBids }, dispatch),
)(Bids));
