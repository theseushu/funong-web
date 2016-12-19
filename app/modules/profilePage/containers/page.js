import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Appbar from '../../common/Appbar';
import MainSection from '../../common/mainSection';
import Avatar from '../../common/avatar';

import AvatarCropper from '../avatarCropper';

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

const ProfilePage = ({ sheet: { classes } }) => (
  <div style={{ height: 2000 }}>
    <Appbar />
    <MainSection>
      <div className={classes.avatar}>
        <Avatar shadow={3} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <AvatarCropper />
        </div>
      </div>
    </MainSection>
  </div>
);

ProfilePage.propTypes = {
  sheet: PropTypes.object.isRequired,
};


export default injectSheet(styles)(ProfilePage);
