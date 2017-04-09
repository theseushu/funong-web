import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions, selectors } from 'api/products/ducks';
import ApiButtonWithIcon from 'modules/common/buttons/ApiButtonWithIcon';
import ApiIconButton from 'modules/common/buttons/ApiIconButton';
import confirm from 'modules/toastr/confirm';

const stateSelector = (method) => (state, { type, product: { objectId } }) => ({ ...selectors[type][method](state)[objectId] });
const bind = (method) => (dispatch, { type, product: { objectId } }) => bindActionCreators({ onClick: () => actions[type][method]({ objectId, meta: { storeKey: objectId } }) }, dispatch);
const selectStates = ({ pending }, { onClick }, { type, product, ...props }) => ({ // eslint-disable-line
  pending,
  onClick,
  ...props,
});

export const Enable = connect(
  stateSelector('enable'),
  bind('enable'),
  selectStates,
)((props) => <ApiButtonWithIcon colored icon="vertical_align_top" {...props}>上架</ApiButtonWithIcon>);

export const Disable = connect(
  stateSelector('disable'),
  bind('disable'),
  selectStates,
)((props) => <ApiButtonWithIcon accent icon="vertical_align_bottom" {...props}>下架</ApiButtonWithIcon>);

export const Remove = connect(
  stateSelector('remove'),
  (dispatch, props) => {
    const { onClick } = bind('remove')(dispatch, props);
    return {
      onClick: () => confirm({
        title: '删除后不能恢复，确定吗？',
        ok: onClick,
        cancel: null,
      }),
    };
  },
  selectStates,
)((props) => <ApiIconButton accent icon="delete_sweep" {...props} />);
