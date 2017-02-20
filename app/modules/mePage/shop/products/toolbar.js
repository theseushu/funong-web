import React, { PropTypes } from 'react';
import _find from 'lodash/find';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import Button from 'react-mdl/lib/Button';
import Menu from 'react-mdl-extra/lib/Menu';
import MenuItem from 'react-mdl-extra/lib/MenuItem';
import { availableValues } from 'appConstants';
import { myShopSelector } from 'modules/data/ducks/selectors';
import { actions, selectors } from './ducks';

const setSearchParamsAction = actions.setSearchParams;
const searchParamsSelector = selectors.searchParams;

const Toolbar = ({ classes, searchParams, setSearchParams }) => {
  const { available } = searchParams;
  const availableValue = _find(availableValues, (entry) => entry.value === available) || availableValues.all;
  return (
    <div className={classes.toolbar}>
      <span>
      状态：
      <Menu target={<Button colored>{availableValue.title}</Button>}>
        {Object.values(availableValues).map((entry, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              setSearchParams({ ...searchParams, available: entry.value });
            }}
          >{entry.title}</MenuItem>
        ))}
      </Menu>
      </span>
    </div>
  );
};
Toolbar.propTypes = {
  searchParams: PropTypes.object.isRequired,
  setSearchParams: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  toolbar: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 16,
  },
})(connect(
  (state) => ({ shop: myShopSelector(state), searchParams: searchParamsSelector(state) }),
  (dispatch) => bindActionCreators({ setSearchParams: setSearchParamsAction }, dispatch),
)(Toolbar));
