import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MdBlurCircular from 'react-icons/lib/md/blur-circular';
import FaPagelines from 'react-icons/lib/fa/pagelines';
import { actions as pageActions } from './ducks';
import Appbar from '../common/Appbar';
import MainSection from '../common/mainSection';
import Avatar from '../common/avatar';

import AvatarCropper from './avatarCropper';
import { Tabs, Tab } from '../common/raisingButtonTab';

import Products from './products';

const styles = {
  avatar: {
    width: 160,
    height: 160,
    marginTop: -95, // padding 15 of panel
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
  },
};

const ProfilePage = ({ tabIndex, sheet: { classes }, actions: { switchTab } }) => (
  <div style={{}}>
    <Appbar />
    <MainSection>
      <div className={classes.avatar}>
        <Avatar shadow={3} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <AvatarCropper />
        </div>
      </div>
      <Tabs index={tabIndex} switchTab={switchTab}>
        <Tab icon={<FaPagelines />} label="货品" index={0}>
          <Products />
        </Tab>
        <Tab icon={<MdBlurCircular />} label="交易圈" index={1}>
        </Tab>
      </Tabs>
    </MainSection>
  </div>
);

ProfilePage.propTypes = {
  sheet: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  tabIndex: PropTypes.number.isRequired,
};

export default connect(
  (state) => state.profilePage,
  (dispatch) => ({ actions: bindActionCreators(pageActions, dispatch) }),
)(injectSheet(styles)(ProfilePage));
