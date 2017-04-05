import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Layout, Content, Drawer } from 'react-mdl/lib/Layout';
import { Footer, FooterLinkList, FooterSection } from 'react-mdl/lib/Footer';
import { shadows, breakpoints } from 'modules/common/styles';
import Container from './container';
import Header from './header';
import BottomNav from './bottomNav';
import SideMenu from './sideMenu';

class LayoutComponent extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    classes: PropTypes.object,
    container: PropTypes.bool,
    sideMenu: PropTypes.array,
    onReturn: PropTypes.func,
    onSearch: PropTypes.func,
  }
  static defaultProps = {
    container: true,
  }
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
  }
  render() {
    const { container, children, sideMenu = [], onSearch, onReturn, classes } = this.props;
    return (
      <Layout fixedHeader fixedTabs className={classes.layout}>
        <Header sideMenu={sideMenu} onSearch={onSearch} onReturn={onReturn} />
        {sideMenu && <Drawer title="Title">
          <div><SideMenu routes={sideMenu} /></div>
        </Drawer>
        }
        <Content className={classes.content}>
          {
            container ? (
              <Container className={classes.layoutContainer}>
                { sideMenu && <SideMenu className={`${classes.sideMenu} ${shadows.shadow2}`} routes={sideMenu} /> }
                <div className={classes.children}>
                  {children}
                </div>
              </Container>
            ) : children
          }
          <Footer size="mini">
            <FooterSection className={classes.container} type="left" logo="Title">
              <FooterLinkList>
                <a href="#help">Help</a>
                <a href="#privacy">Privacy & Terms</a>
              </FooterLinkList>
            </FooterSection>
          </Footer>
          <BottomNav />
        </Content>
      </Layout>
    );
  }
}

export default injectSheet({
  content: {
    [breakpoints.mediaTabletBelow]: {
      paddingBottom: 56,
    },
  },
  layoutContainer: {
    minHeight: 'calc(100vh - 155px)', // compact header: 56, footer: 100
    display: 'flex',
    width: '100%',
    paddingTop: 24,
  },
  sideMenu: {
    marginRight: 24,
    [breakpoints.mediaDestkopBelow]: {
      display: 'none',
    },
  },
  children: {
    flex: 1,
  },
})(LayoutComponent);
