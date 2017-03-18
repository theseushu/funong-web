import React, { PropTypes } from 'react';
import _find from 'lodash/find';
import injectSheet from 'react-jss';
import IconButton from 'react-mdl/lib/IconButton';
import { statusValues } from 'appConstants';
import { colors } from 'modules/common/styles';

const Menu = ({ status, isCompact, onClick, classes }) => {
  const statusValue = _find(statusValues, (s) => s.value === status);
  return (
    <div className={classes.menu}>
      <span>{statusValue && statusValue.title}</span>
      <IconButton name={isCompact ? 'expand_more' : 'expand_less'} onClick={onClick} />
    </div>
  );
};
Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  status: PropTypes.number,
  isCompact: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default injectSheet({
  menu: {
    height: 32,
    lineHeight: '32px',
    '& > span': {
      color: colors.colorAccent,
    },
  },
})(Menu);
