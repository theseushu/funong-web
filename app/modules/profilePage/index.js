import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as pageActions } from './ducks';

import Layout from '../common/layout';
import Avatar from '../common/avatar';

import Profile from './profile';
import Products from './products';
import { colors } from '../common/styles';

const ProfilePage = ({ tabIndex, sheet: { classes }, actions: { switchTab } }) => (
  <Layout
    header={
      <div className={classes.headerAvatar}>
        <Avatar />
      </div>
    }
    sideMenu={{}}
    content={
      <Profile />
    }
  >
  </Layout>
);

/*
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
 */

ProfilePage.propTypes = {
  sheet: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  tabIndex: PropTypes.number.isRequired,
};

export default connect(
  (state) => state.profilePage,
  (dispatch) => ({ actions: bindActionCreators(pageActions, dispatch) }),
)(injectSheet({
  avatar: {
    width: 160,
    height: 160,
    marginTop: -95, // padding 15 of panel
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
  },
  headerAvatar: {
    height: 150,
    width: 150,
    padding: 2,
    borderRadius: '50%',
    border: `solid 1px ${colors.colorPrimary}`,
    '.is-compact &': {
      height: 50,
      width: 50,
    },
  },
})(ProfilePage));
