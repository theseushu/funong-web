import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
import Layout from '../common/layout';
import Account from './account';

class Profile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Layout>
        <Helmet
          title="我的润财"
          meta={[
            { name: '我的润财', content: '我的润财' },
          ]}
        />
        <Account />
      </Layout>
    );
  }
}

export default injectSheet({})(Profile);
