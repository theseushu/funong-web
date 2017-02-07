import React, { Component, PropTypes } from 'react';
import Button from 'react-mdl/lib/Button';
import Menu from 'react-mdl-extra/lib/Menu';
import MenuItem from 'react-mdl-extra/lib/MenuItem';
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
    const { profile, updateProfile } = this.props;
    updateProfile({ profileId: profile.objectId, type });
  }
  render() {
    const { sheet: { classes }, pending, profile } = this.props;
    return (
      <Line
        title="用户类型"
        content={
          <Menu
            target={
              <Button
                colored
                accent={!profile.type}
                disabled={pending}
              >{pending ? '请稍候...' : (profile.type || '请添加名称')}</Button>
            }
          >
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
