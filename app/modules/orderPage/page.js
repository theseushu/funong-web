import React, { Component, PropTypes } from 'react';
import _debounce from 'lodash/debounce';
import _filter from 'lodash/filter';
import _groupBy from 'lodash/groupBy';
import _union from 'lodash/union';
import _without from 'lodash/without';
import _find from 'lodash/find';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { selectors } from '../cartPage/ducks';
import Addresses from './addresses';

class Page extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
  }
  render() {
    const { user, items } = this.props;
    return (
      <div style={{ width: '100%' }}>
        <Addresses />
      </div>
    );
  }
}

const itemsSelector = selectors.items;
export default connect(
  (state) => ({ items: itemsSelector(state), user: currentUserSelector(state) }),
  (dispatch) => {
    return {};
  },
)(Page);
