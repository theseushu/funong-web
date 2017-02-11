import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Layout, Content } from 'react-mdl/lib/Layout';
import { Footer, FooterLinkList, FooterSection } from 'react-mdl/lib/Footer';
import styles, { breakpoints } from '../styles';

import SideMenu from './sideMenu';
import { AppHeader, AppDrawer } from './appHeader';

class LayoutComponent extends Component {
  static propTypes = {
    sheet: PropTypes.object,
    sideMenu: PropTypes.array,
    content: PropTypes.any,
    header: PropTypes.any,
    smallContent: PropTypes.bool,
  }
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
  }
  render() {
    const { sheet: { classes }, content, sideMenu, header, smallContent } = this.props;
    return (
      <Layout fixedHeader fixedTabs className={classes.layout}>
        <AppHeader header={header} />
        <AppDrawer />
        <Content>
          <div
            className={smallContent ? [styles.container, styles.containerSmall].join(' ') : styles.container}
            style={{ paddingTop: 16, paddingBottom: 16, display: 'flex', minHeight: 'calc(100vh - 163px)' }}
          >
            { sideMenu && <SideMenu routes={sideMenu} /> }
            {content}
          </div>
          <Footer size="mini">
            <FooterSection className={styles.container} type="left" logo="Title">
              <FooterLinkList>
                <a href="#help">Help</a>
                <a href="#privacy">Privacy & Terms</a>
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
    zIndex: 100001,
    [breakpoints.mediaDestkopAbove]: {
      '& .mdl-layout__drawer-button': {
        display: 'none',
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
})(LayoutComponent);
