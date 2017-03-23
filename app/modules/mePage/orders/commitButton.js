import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { statusValues } from 'appConstants';
import ApiButtonWithIcon from 'modules/common/buttons/ApiButtonWithIcon';
import { actions, selectors } from 'api/order';
import { stripOrder, commitButtonName } from 'utils/orderUtils';

const CommitButton = ({ commit, commitState, order, changed = false }) => (
  <ApiButtonWithIcon
    key={0}
    colored
    icon="save"
    pending={commitState ? commitState.pending : false}
    disabled={!order.can.commit.available || (order.can.commit.to === statusValues.unconfirmed.value && !changed)}
    onClick={() => commit({ order: stripOrder(order) })}
  >{commitButtonName(order.can.commit.to)}</ApiButtonWithIcon>
  );

CommitButton.propTypes = {
  order: PropTypes.object.isRequired,
  changed: PropTypes.bool,
  commit: PropTypes.func.isRequired,
  commitState: PropTypes.object,
};

const commitAction = actions.commit;
const commitSelector = selectors.commit;

export default connect(
  (state) => ({ commitState: commitSelector(state) }),
  (dispatch) => bindActionCreators({ commit: ({ order, meta = {} }) => commitAction({ order, meta: { ...meta, storeKey: order.objectId } }) }, dispatch),
)(CommitButton);
