import React from 'react';
import Helmet from 'react-helmet';
import Layout from 'modules/common/layout';
import Ads from './components/ads';


const HomePage = () => (
  <div>
    <Helmet
      title="欢迎来到聚农商"
      meta={[
        { name: 'welcome', content: 'welcome' },
      ]}
    />
    <Layout
      content={
        <Ads />
      }
    >
    </Layout>
  </div>
);

HomePage.propTypes = {
};

export default HomePage;
