import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import Button from 'react-mdl/lib/Button';
import Menu, { MenuItem } from 'react-mdl/lib/Menu';
import { myShopSelector } from 'modules/data/ducks/selectors';
import { actions, selectors } from './ducks';

const setSearchParamsAction = actions.setSearchParams;
const searchParamsSelector = selectors.searchParams;

const Toolbar = ({ classes, searchParams, setSearchParams }) => {
  const { available } = searchParams;
  let avaiableTitle = '全部';
  if (available != null) {
    avaiableTitle = available ? '上架的' : '下架的';
  }
  return (
    <div className={classes.toolbar}>
      <span>
      状态：
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Button id="_shop_product_status_menu" colored>{avaiableTitle}</Button>
          <Menu target="_shop_product_status_menu">
            <MenuItem
              onClick={() => {
                setSearchParams({ ...searchParams, available: undefined });
              }}
            >全部</MenuItem>
            <MenuItem
              onClick={() => {
                setSearchParams({ ...searchParams, available: true });
              }}
            >上架的</MenuItem>
            <MenuItem
              onClick={() => {
                setSearchParams({ ...searchParams, available: false });
              }}
            >下架的</MenuItem>
          </Menu>
        </div>
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
