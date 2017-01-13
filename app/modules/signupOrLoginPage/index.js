import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
import { Card, CardTitle, CardText, CardMedia } from 'react-mdl/lib/Card';
import { Tabs, Tab } from 'react-mdl/lib/Tabs';
import RequestSmsCodeButton from './requestSmsCodeButton/requestSmsCodeButtonContainer';
import Form from './signupOrLoginForm/signupOrLoginFormContainer';
import styles, { layouts, breakpoints } from '../common/styles';
import mediaBg from './assets/media-bg.jpg';
import backgroundImg from './assets/bg.jpg';
import logo from '../../assets/logo.png';


export class SignupOrLogin extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }
  changeTab = (tabId) => {
    const { router } = this.context;
    if (tabId === 0) {
      router.push('signup');
    } else if (tabId === 1) {
      router.push('login');
    }
  }
  render() {
    const { sheet: { classes } } = this.props;
    const login = this.context.router.isActive('login');
    return (
      <div className={classes.background}>
        <Helmet
          title="登录/注册"
          meta={[
            { name: '登录/注册', content: '登录 注册' },
          ]}
        />
        <div className={styles.contentCenter}>
          <Card shadow={4} className={classes.formWrapper}>
            <CardMedia className={classes.media}>
              <img role="presentation" src={logo} />
            </CardMedia>
            <CardTitle>
              <Tabs activeTab={login ? 1 : 0} onChange={this.changeTab} ripple>
                <Tab>立即加入</Tab>
                <Tab>登录</Tab>
              </Tabs>
            </CardTitle>
            <CardText>
              <Form login={login} RequestSmsCodeButton={RequestSmsCodeButton} />
            </CardText>
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
