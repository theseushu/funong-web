import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectSheet from 'react-jss';
import BlockLoading from 'modules/common/glossary/loading';
import NoResult from 'modules/common/glossary/noResult';
import * as ProductLists from 'modules/common/product/lists';
import { actions, selectors } from './ducks';

class ProductSelector extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    query: PropTypes.object.isRequired,
    search: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    selected: PropTypes.array,
    pending: PropTypes.bool,
    result: PropTypes.array,
  }
  componentDidMount() {
    const { query, search } = this.props;
    search(query);
  }
  render() {
    const { type, pending, result = [], onSelect, selected } = this.props;
    if (pending) {
      return <BlockLoading />;
    }
    if (result.length === 0) {
      return <NoResult title="您没有此类产品" />;
    }
    const Lists = ProductLists[type];
    return <Lists products={result} selected={selected} onSelect={onSelect} />;
  }
}

export default connect(
  (state, { type }) => ({
    ...selectors[type](state),
  }),
  (dispatch, { type }) => bindActionCreators({ search: actions[type] }, dispatch),
)(injectSheet({})(ProductSelector));
