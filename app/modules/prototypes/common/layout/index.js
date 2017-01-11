import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Layout, Header, HeaderRow, HeaderTabs, Drawer, Content, Navigation } from 'react-mdl/lib/Layout';
import { Tab } from 'react-mdl/lib/Tabs';
import { List, ListItem, ListItemContent } from 'react-mdl/lib/List';

import { breakpoints } from '../styles';

import avatar from '../../assets/107013075633.jpg';
import backgroundImg from './assets/layout-bg.jpg';
import MainSection from './mainSection';

const styles = {
  header: {
  },
  navigation: {
  },
  tabs: {
  },
  background: {
    width: '100%',
    height: 200,
    position: 'absolute',
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: 'cover',
    [breakpoints.mediaBigScreen]: {
      height: 250,
      top: -64,
    },
  },
}

class Menu extends React.Component {
  static propTypes = {
    sheet: PropTypes.object.isRequired,
    children: PropTypes.any,
  }
  constructor(props) {
    super(props)
    this.state = { activeTab: 2 };
  }
  render() {
    const { sheet: { classes } } = this.props;
    return (
      <div>
        <Layout fixedHeader={false}>
          <Header waterfall hideTop className={classes.header}>
            <HeaderRow title="农贸">
              <Navigation className={classes.navigation}>
                <a href="">供应大厅</a>
                <a href="">采购</a>
                <a href="">市场行情</a>
                <a href="">专家讲堂</a>
                <a href=""><img style={{ width: '2em', height: '2em', borderRadius: '50%' }} role="presentation" src={avatar}></img></a>
              </Navigation>
            </HeaderRow>
            <HeaderTabs ripple activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })}>
              <Tab>订单</Tab>
              <Tab>店铺</Tab>
              <Tab>账户</Tab>
              <Tab>交易圈</Tab>
            </HeaderTabs>
          </Header>
          <Drawer>
            <List>
              <ListItem>
                <ListItemContent icon="person"><a href="">供应大厅</a></ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemContent icon="person"><a href="">采购</a></ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemContent icon="person"><a href="">市场行情</a></ListItemContent>
              </ListItem>
              <ListItem>
                <ListItemContent icon="person"><a href="">专家讲堂</a></ListItemContent>
              </ListItem>
            </List>
          </Drawer>
          <Content>
            <div className={classes.background} />
            <MainSection>
              {this.props.children}
            </MainSection>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default injectSheet(styles)(Menu);
