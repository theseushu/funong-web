import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Container, Layout } from 'modules/common/layouts';
import { breakpoints } from 'modules/common/styles';
import Ads from './components/ads';
import Modules from './components/modules';
import PopularProducts from './components/popularProducts';
import SpecificCategory from './components/specificCategory';
import welcome from './assets/welcome.png';


const HomePage = ({ classes }) => (
  <div>
    <Layout
      helmet={{ title: '欢迎来到富农商城' }}
      container={false}
      header={<div className={classes.header}><img src={welcome} role="presentation" /></div>}
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
  header: {
    marginLeft: 48,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    [breakpoints.mediaDestkopBelow]: {
      display: 'none',
    },
  },
  mt48: {
    marginTop: 48,
  },
})(HomePage);
