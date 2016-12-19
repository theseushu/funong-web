import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MdBlurCircular from 'react-icons/lib/md/blur-circular';
import FaPagelines from 'react-icons/lib/fa/pagelines';
import { actions as pageActions } from '../ducks';
import Appbar from '../../common/Appbar';
import MainSection from '../../common/mainSection';
import Avatar from '../../common/avatar';

import AvatarCropper from '../avatarCropper';
import { Tabs, Tab } from '../../common/raisingButtonTab';


const styles = {
  avatar: {
    width: 160,
    height: 160,
    marginTop: -80,
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
  },
};

const ProfilePage = ({ tabIndex, sheet: { classes }, actions: { switchTab } }) => (
  <div style={{ height: 2000 }}>
    <Appbar />
    <MainSection>
      <div className={classes.avatar}>
        <Avatar shadow={3} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <AvatarCropper />
        </div>
      </div>
      <div className="container">
        <Tabs index={tabIndex} switchTab={switchTab}>
          <Tab icon={<FaPagelines />} label="货品" index={0}>
            {/*<div className={renderer.renderRule(addButtonStyle)}>
              <div className="container">
                <FloatingActionButton secondary style={{ float: 'right' }}>
                  <ContentAdd />
                </FloatingActionButton>
              </div>
            </div>*/}
          </Tab>
          <Tab icon={<MdBlurCircular />} label="交易圈" index={1}>
          </Tab>
        </Tabs>
      </div>
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
