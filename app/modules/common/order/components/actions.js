import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Button from 'react-mdl/lib/Button';
import { statusValues } from 'appConstants';
import { colors } from 'modules/common/styles';
const debug = require('debug')('modules:common:order:components:actions');

const Actions = ({ order, actions, classes }) => {
  const { can } = order;
  const buttons = [];
  if (!actions) {
    return null;
  }
  if (can.commit && actions.commit) {
    let name = null;
    switch (can.commit) {
      case statusValues.unconfirmed.value:
        name = '修改订单';
        break;
      case statusValues.billed.value:
        name = '确认订单';
        break;
      case statusValues.payed.value:
        name = '付款';
        break;
      case statusValues.shipped.value:
        name = '发货';
        break;
      case statusValues.finished.value:
        name = '确认收货';
        break;
      default:
    }
    if (name) {
      buttons.push(
        <Button
          colored
          raised
        >{name}</Button>
      );
    } else {
      debug(`Cannot commit order due to its status`)
    }
  }
  return (
    <div className={classes.actions}>

    </div>
  );
};

Actions.propTypes = {
  classes: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    commit: PropTypes.func,
    reset: PropTypes.func,
    cancel: PropTypes.func,
  }),
}

export default injectSheet({
  actions: {
    width: '100%',
    textAlign: 'right',
  },
})(Actions);
