import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { Page } from 'modules/common/bid';
import styles from 'modules/common/styles';
import LoadingDiv from 'modules/common/glossary/loadingDiv';
import { actions, selectors } from '../ducks';

const pageSize = 10;
class Bids extends Component {
  static propTypes = {
    search: PropTypes.func.isRequired,
    inquiry: PropTypes.object.isRequired,
    user: PropTypes.object,
    pending: PropTypes.bool,
    result: PropTypes.object,
    onWithdrawn: PropTypes.func,
  }
  componentDidMount() {
    this.search(1);
  }
  search(page) {
    const { inquiry, user, search } = this.props;
    if (user && user.objectId !== inquiry.owner.objectId) {
      search({ inquiry, mine: true, page, pageSize });
    }
  }
  render() {
    const { user, inquiry, pending, result, onWithdrawn } = this.props;
    if (!user || user.objectId === inquiry.owner.objectId) {
      return null;
    }
    return (
      <LoadingDiv pending={pending} className={styles.mt24}>
        {
          result && (
            <div>
              <h6>我的报价</h6>
              <Page page={result} hideUser actions={['edit', 'withdraw']} onPageChange={(page) => this.search(page)} onWithdrawn={onWithdrawn} />
            </div>
          )
        }
      </LoadingDiv>
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
