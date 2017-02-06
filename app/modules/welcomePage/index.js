import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
import { Card, CardTitle } from 'react-mdl/lib/Card';
import styles, { layouts, breakpoints } from '../common/styles';
import mediaBg from './assets/media-bg.jpg';
import backgroundImg from './assets/bg.jpg';
import UserTypes from './userTypes';


export class SignupOrLogin extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }
  render() {
    const { sheet: { classes } } = this.props;
    return (
      <div className={classes.background}>
        <Helmet
          title="欢迎加入"
          meta={[
            { name: 'welcome', content: 'welcome' },
          ]}
        />
        <div className={styles.contentCenter}>
          <Card shadow={4} className={classes.formWrapper}>
            <CardTitle>
              欢迎加入润财农贸平台！<br />您希望：
            </CardTitle>
            <UserTypes />
          </Card>
        </div>
      </div>
    );
  }
}

SignupOrLogin.propTypes = {
  sheet: PropTypes.object.isRequired,
};

export default injectSheet({
  background: {
    minHeight: '100vh',
    height: 'auto',
    background: `center url(${backgroundImg})`,
    backgroundSize: 'cover',
    '& > div': {
      zIndex: 1,
      position: 'static',
      top: 0,
      left: 0,
      width: '100vw',
      height: 'auto',
      minHeight: '100vh',
      background: 'rgba(0,0,0,0.4)',
    },
  },
  title: {
    textAlign: 'center',
  },
  formWrapper: {
    zIndex: 3,
    width: '100%',
    maxWidth: 300,
    margin: `auto ${layouts.gutterSmall}px`,
    backgroundImage: `url(${mediaBg})`,
    backgroundSize: 'cover',
  },
  media: {
    background: 'none',
    textAlign: 'center',
    padding: '16px 16px 0',
    '& > img': {
      width: 120,
      height: 120,
    },
    [breakpoints.mediaTabletBelow]: {
      '& > img': {
        width: 50,
        height: 50,
      },
    },
  },
})(SignupOrLogin);
