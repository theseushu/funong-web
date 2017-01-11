import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import injectSheet from 'react-jss';
import { Card, CardTitle } from 'react-mdl/lib/Card';
import FABButton from 'react-mdl/lib/FABButton';
import FaShoppingCart from 'react-icons/lib/fa/shopping-cart';
import FaTruck from 'react-icons/lib/fa/truck';
import Link from 'react-router/lib/Link';

import RequestSmsCodeButton from './requestSmsCodeButton/requestSmsCodeButton';
import Form from './signupOrLoginForm/signupOrLoginForm';


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
    margin: '0 8px',
    '@media (min-width: 576px)': {
      margin: '0 16px',
    },
    '@media (min-width: 768px)': {
      width: '400px',
      margin: '0 auto',
    },
  },
};

const AfterSignup = injectSheet({
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 258,
    '& > a': {
      textAlign: 'center',
    },
  },
})(({ sheet: { classes } }) => (
  <div className={classes.wrapper}>
    <a>
      <FABButton colored>
        <FaShoppingCart />
      </FABButton>
      <div>
        我要买
      </div>
    </a>
    <Link to="/prototype/profile">
      <FABButton colored>
        <FaTruck />
      </FABButton>
      <div>
        我要开店
      </div>
    </Link>
  </div>
));

export class SignupOrLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { signupDone: false };
  }
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
        <Card shadow={2} className={classes.formWrapper}>
          <CardTitle>
            { this.state.signupDone ?

              <AfterSignup /> :
              <Form
                handleSubmit={(e) => {
                  e.preventDefault();
                  this.setState({ signupDone: true });
                }} RequestSmsCodeButton={RequestSmsCodeButton}
              />
        }
          </CardTitle>
        </Card>
      </div>
    );
  }
}

SignupOrLogin.propTypes = {
  sheet: PropTypes.object.isRequired,
};

export default injectSheet(styles)(SignupOrLogin);
