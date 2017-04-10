import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Page } from 'modules/common/bid';
import { currentUserSelector } from 'modules/data/ducks/selectors';
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
  }
  componentDidMount() {
    this.search(1);
  }
  search(page) {
    const { inquiry, search } = this.props;
    search({ inquiry, page, pageSize });
  }
  render() {
    const { user, inquiry, pending, result } = this.props;
    return (
      <LoadingDiv pending={pending} className={styles.mt24}>
        {
          result && (
            <div>
              <h6>已有{result.total}个报价</h6>
              <Page page={result} hideContent={!user || user.objectId !== inquiry.owner.objectId} onPageChange={(page) => this.search(page)} />
            </div>
          )
        }
      </LoadingDiv>
    );
  }
}

const pageBids = actions.pageBids;
const pageBidsSelector = selectors.pageBids;

export default injectSheet({
})(connect(
  (state) => ({ ...pageBidsSelector(state), user: currentUserSelector(state) }),
  (dispatch) => bindActionCreators({ search: pageBids }, dispatch),
)(Bids));
