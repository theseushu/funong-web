import React, { Component, PropTypes } from 'react';
import Button from 'react-mdl/lib/Button';
import Menu, { MenuItem } from 'react-mdl/lib/Menu';
import injectSheet from 'react-jss';
import { userTypes } from 'appConstants';
import { colors } from 'modules/common/styles';
import Line from '../line';

class Type extends Component {
  static propTypes = {
    profile: PropTypes.object,
    sheet: PropTypes.object,
    updateProfile: PropTypes.func.isRequired,
    pending: PropTypes.bool,
  }
  updateProfile = (type) => {
    const { updateProfile } = this.props;
    updateProfile({ type });
  }
  render() {
    const { sheet: { classes }, pending, profile } = this.props;
    return (
      <Line
        title="用户类型"
        content={
          <div style={{ position: 'relative' }}>
            <Button
              colored
              accent={!profile.type}
              disabled={pending}
              id="_user_type_menu"
            >{pending ? '请稍候...' : (profile.type || '请添加名称')}</Button>
            <Menu target="_user_type_menu">
              {
                userTypes.map((type, i) => <MenuItem
                  className={type.value === profile.type ? classes.selected : null}
                  key={i}
                  onClick={type.value === profile.type ? null : () => this.updateProfile(type.value)}
                >
                  {type.value}
                </MenuItem>)
              }
            </Menu>
          </div>
        }
      />
    );
  }
}

export default injectSheet({
  selected: {
    color: colors.colorAccent,
  },
})(Type);
