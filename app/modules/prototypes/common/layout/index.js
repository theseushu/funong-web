import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Layout, Content } from 'react-mdl/lib/Layout';
import { Footer, FooterLinkList, FooterSection } from 'react-mdl/lib/Footer';

import styles, { breakpoints } from '../../common/styles';

import SideMenu from './sideMenu';
import { AppHeader, AppDrawer } from './appHeader';

class Sample extends Component {
  static propTypes = {
    sheet: PropTypes.object,
    children: PropTypes.any,
  }
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
  }
  render() {
    const { sheet: { classes } } = this.props;
    return (
      <Layout fixedHeader fixedTabs className={classes.layout}>
        <AppHeader />
        <AppDrawer />
        <Content>
          <div className={styles.container} style={{ paddingTop: 16, paddingBottom: 16, display: 'flex', minHeight: 'calc(100vh - 163px)' }}>
            {this.props.children}
          </div>
          <Footer size="mini">
            <FooterSection className={styles.container} type="left" logo="Title">
              <FooterLinkList>
                <a href="#">Help</a>
                <a href="#">Privacy & Terms</a>
              </FooterLinkList>
            </FooterSection>
          </Footer>
        </Content>
      </Layout>
    );
  }
}

export default injectSheet({
  layout: {
    '& .mdl-layout__tab-bar-container': {
      display: 'none',
    },
    '@media (min-width: 840px)': {
      '& .mdl-layout__drawer-button': {
        display: 'none',
      },
      '& .mdl-layout__tab-bar-container': {
        display: 'block',
      },
    },
  },
  content: {
    flex: '1',
    marginLeft: 24,
    [breakpoints.mediaDestkopBelow]: {
      marginLeft: 0,
    },
  },
})(Sample);
