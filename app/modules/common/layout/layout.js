import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Layout, Content } from 'react-mdl/lib/Layout';
import { Footer, FooterLinkList, FooterSection } from 'react-mdl/lib/Footer';
import moduleStyles from './styles';
import SideMenu from './components/sideMenu';
import AppHeader from './components/header';
import AppDrawer from './components/drawer';

class LayoutComponent extends Component {
  static propTypes = {
    classes: PropTypes.object,
    sideMenu: PropTypes.array,
    content: PropTypes.any,
    header: PropTypes.any,
    container: PropTypes.bool,
    smallContent: PropTypes.bool,
  }
  static defaultProps = {
    container: true,
  }
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
  }
  render() {
    const { classes, container, content, sideMenu, header, smallContent } = this.props;
    let className = null;
    if (container) {
      className = smallContent ? [classes.container, classes.containerSmall].join(' ') : classes.container;
    }
    return (
      <Layout fixedHeader fixedTabs className={classes.layout}>
        <AppHeader header={header} containerClass={classes.container} />
        <AppDrawer />
        <Content>
          <div
            className={className}
            style={{ paddingTop: 16, paddingBottom: 16, display: 'flex', minHeight: 'calc(100vh - 163px)' }}
          >
            { sideMenu && <SideMenu routes={sideMenu} /> }
            {content}
          </div>
          <Footer size="mini">
            <FooterSection className={classes.container} type="left" logo="Title">
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

export default injectSheet(moduleStyles)(LayoutComponent);
