import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import injectSheet from 'react-jss';
import Panel from 'react-bootstrap/lib/Panel';

// import messages from './messages';

import RequestSmsCodeButton from './requestSmsCodeButton/requestSmsCodeButtonContainer';
import Form from './signupOrLoginForm/signupOrLoginFormContainer';

const backgroundImg = require('./assets/login-bg.jpg');
const styles = {
  background: {
    minHeight: '100vh',
    height: 'auto',
    background: `center url(${backgroundImg})`,
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&> ._before': {
      zIndex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.5)',
    },
  },
  formWrapper: {
    zIndex: 3,
    width: '100%',
    padding: '0 8px',
    margin: 'auto',
    '@media (min-width: 576px)': {
      padding: '0 16px',
      '> div': {
        padding: '16px',
      },
    },
    '@media (min-width: 768px)': {
      width: '400px',
    },
    '> div': {
      padding: '8px',
    },
  },
};

export class SignupOrLogin extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { sheet: { classes } } = this.props;
    return (
      <div className={classes.background}>
        <Helmet
          title="登录/注册"
          meta={[
            { name: '登录/注册', content: '登录 注册' },
          ]}
        />
        <div className="_before">
        </div>
        <div className={classes.formWrapper}>
          <Panel>
            <Form RequestSmsCodeButton={RequestSmsCodeButton} />
          </Panel>
        </div>
      </div>
    );
  }
}

SignupOrLogin.propTypes = {
  sheet: PropTypes.object.isRequired,
};

export default injectSheet(styles)(SignupOrLogin);
