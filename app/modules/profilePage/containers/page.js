import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Appbar from '../../common/Appbar';
import MainSection from '../../common/mainSection';
import Avatar from '../../common/avatar/containers/avatar';

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
        <Avatar />
      </div>
    </MainSection>
  </div>
);

ProfilePage.propTypes = {
  sheet: PropTypes.object.isRequired,
}


export default injectSheet(styles)(ProfilePage);
