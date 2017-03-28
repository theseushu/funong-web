import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Page } from 'modules/common/bid';
import BlockLoading from 'modules/common/glossary/blockLoading';
import { actions, selectors } from '../ducks';

class Bids extends Component {
  static propTypes = {
    search: PropTypes.func.isRequired,
    inquiry: PropTypes.object.isRequired,
    pending: PropTypes.bool,
    result: PropTypes.object,
  }
  componentDidMount() {
    const { inquiry, search } = this.props;
    search({ inquiry });
  }
  render() {
    const { pending, result } = this.props;
    if (pending) {
      return <BlockLoading />;
    }
    if (!result) {
      return null;
    }
    return (
      <div>
        <h6>已有{result.total}个报价</h6>
        <Page page={result} hideContent />
      </div>
    );
  }
}

const pageBids = actions.pageBids;
const pageBidsSelector = selectors.pageBids;

export default injectSheet({
})(connect(
  (state) => ({ ...pageBidsSelector(state) }),
  (dispatch) => bindActionCreators({ search: pageBids }, dispatch),
)(Bids));
