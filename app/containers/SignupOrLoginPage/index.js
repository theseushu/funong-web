import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import injectSheet from 'react-jss';
import Panel from 'react-bootstrap/lib/Panel';

import makeSelectSignupOrLogin from './selectors';
// import messages from './messages';

import Form from './form';

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
            <Form />
          </Panel>
        </div>
      </div>
    );
  }
}

SignupOrLogin.propTypes = {
  sheet: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  SignupOrLogin: makeSelectSignupOrLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(SignupOrLogin));
