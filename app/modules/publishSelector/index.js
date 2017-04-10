import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectSheet from 'react-jss';
import PublishPage from 'modules/common/publishes/page';
import { actions, selectors } from './ducks';
import List from './list';

const pageSize = 20;

class PublishSelector extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    query: PropTypes.object.isRequired,
    search: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    selected: PropTypes.array,
    pending: PropTypes.bool,
    result: PropTypes.object,
    single: PropTypes.bool.isRequired,
  }
  static defaultProps = {
    single: true,
  }
  componentDidMount() {
    this.search(1);
  }
  search = (page) => {
    const { search, query } = this.props;
    search({ ...query, page, pageSize });
  }
  render() {
    const { type, pending, result, onSelect, selected = [], single } = this.props;
    let computedSelected = [...selected];
    if (single) {
      computedSelected = selected.length > 0 ? [selected[0]] : [];
    }
    return (
      <PublishPage
        type={type}
        pending={pending}
        page={result}
        onPageChange={this.search}
        List={({ entries }) => <List single={single} type={type} entries={entries} selected={computedSelected} onSelect={onSelect} />}
      />
    );
  }
}

export default connect(
  (state, { type }) => ({
    ...selectors[type](state),
  }),
  (dispatch, { type }) => bindActionCreators({ search: actions[type] }, dispatch),
)(injectSheet({})(PublishSelector));
