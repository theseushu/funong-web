import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Container, Layout } from 'modules/common/layouts';
import Ads from './components/ads';
import Modules from './components/modules';
import PopularProducts from './components/popularProducts';
import SpecificCategory from './components/specificCategory';

const HomePage = ({ classes }) => (
  <div>
    <Layout
      helmet={{ title: '欢迎来到聚农商' }}
      container={false}
    >
      <div>
        <section>
          <Ads />
        </section>
        <section className={classes.mt48}>
          <Container>
            <Modules />
          </Container>
        </section>
        <section className={classes.mt48}>
          <Container>
            <PopularProducts />
          </Container>
        </section>
        <section className={classes.mt48}>
          <Container>
            <SpecificCategory />
          </Container>
        </section>
        <section className={classes.mt48}>
        </section>
      </div>
    </Layout>
  </div>
);

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  mt48: {
    marginTop: 48,
  },
})(HomePage);
