import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Layout, Header, HeaderRow, HeaderTabs, Drawer, Content } from 'react-mdl/lib/Layout';
import { Tabs, Tab } from 'react-mdl/lib/Tabs';
import { Card, CardTitle, CardMedia, CardActions } from 'react-mdl/lib/Card';
import Button from 'react-mdl/lib/Button';
import IconButton from 'react-mdl/lib/IconButton';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import Tooltip from 'react-mdl/lib/Tooltip';
import { Footer, FooterLinkList, FooterSection } from 'react-mdl/lib/Footer';

import styles, { breakpoints } from '../common/styles';

import logo from '../assets/logo.png';
import background from '../assets/header-bg.jpg';
import avatar from '../assets/107013075633.jpg';

class Sample extends Component {
  static propTypes = {
    sheet: PropTypes.object,
  }
  render() {
    const { sheet: { classes } } = this.props;
    return (
      <Layout fixedHeader fixedTabs className={classes.layout}>
        <Header waterfall hideTop={false} className={classes.header}>
          <HeaderRow className={classes.logoRow}>
            <div className={classes.logo} />
          </HeaderRow>
          <HeaderTabs ripple activeTab={1} className={[styles.container, classes.nav].join(' ')}>
            <Tab>首页</Tab>
            <Tab>供应</Tab>
            <Tab>采购</Tab>
            <Tab>微店</Tab>
            <Tab>市场行情</Tab>
            <Tab>我的润财</Tab>
          </HeaderTabs>
        </Header>
        <Drawer title="Title" />
        <Content>
          <div className={styles.container} style={{ paddingTop: 16, paddingBottom: 16, display: 'flex' }}>
            <div>
              <Tabs activeTab={0} className={[classes.sidebar, 'mdl-shadow--2dp'].join(' ')} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
                <Tab>个人信息</Tab>
                <Tab>购物车</Tab>
                <Tab>历史订单</Tab>
                <Tab>我的关注</Tab>
                <Tab>我的收藏</Tab>
              </Tabs>
            </div>
            <div className={classes.content}>
              <Card shadow={0} style={{ width: '100%', margin: 'auto' }}>
                <CardTitle>
                  <h2 className="mdl-card__title-text">个人信息</h2>
                  <Tooltip label={<span>点击条目内容即可开始修改<br />您也可以点击图像更换新的头像</span>}>
                    <IconButton colored name="help_outline" style={{ fontSize: '12' }}></IconButton>
                  </Tooltip>
                </CardTitle>
                <CardMedia className={styles.contentCenter} style={{ background: 'none', padding: 8 }}>
                  <img role="presentation" style={{ width: 160, height: 160, borderRadius: '50%' }} src={avatar} />
                </CardMedia>
                <CardActions border>
                  <Grid style={{ width: '100%', boxSizing: 'border-box' }}>
                    <Cell component="h6" col={2} offsetDesktop={2} tablet={3} phone={4}>
                      您的称呼
                    </Cell>
                    <Cell col={6} offsetDesktop={2} tablet={5} phone={3} offsetPhone={1} style={{ textAlign: 'left' }}>
                      <Button colored>胡小为</Button>
                    </Cell>
                    <Cell component="h6" col={2} offsetDesktop={2} tablet={3} phone={4}>
                      所在地
                    </Cell>
                    <Cell col={6} offsetDesktop={2} tablet={5} phone={3} offsetPhone={1} style={{ textAlign: 'left' }}>
                      <Button colored>湖北省武汉市江夏区</Button>
                    </Cell>
                    <Cell component="h6" col={2} offsetDesktop={2} tablet={3} phone={4}>
                      绑定的手机号
                    </Cell>
                    <Cell col={6} offsetDesktop={2} tablet={5} phone={3} offsetPhone={1} style={{ textAlign: 'left' }}>
                      <Button colored>13012345678</Button>
                    </Cell>
                    <Cell component="h6" col={2} offsetDesktop={2} tablet={3} phone={4}>
                      实名认证
                    </Cell>
                    <Cell col={6} offsetDesktop={2} tablet={5} phone={3} offsetPhone={1} style={{ textAlign: 'left' }}>
                      <Button colored>开始认证</Button>
                    </Cell>
                    <Cell component="h6" col={2} offsetDesktop={2} tablet={3} phone={4}>
                      企业认证
                    </Cell>
                    <Cell col={6} offsetDesktop={2} tablet={5} phone={3} offsetPhone={1} style={{ textAlign: 'left' }}>
                      <Button colored>开始认证</Button>
                    </Cell>
                    <Cell component="h6" col={2} offsetDesktop={2} tablet={3} phone={4}>
                      修改密码
                    </Cell>
                    <Cell col={6} offsetDesktop={2} tablet={5} phone={3} offsetPhone={1} style={{ textAlign: 'left' }}>
                      <Button colored>验证手机号码后开始</Button>
                    </Cell>
                  </Grid>
                </CardActions>
              </Card>
            </div>
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
  header: {
    background: `url(${background})`,
    '& .mdl-layout__tab-bar-container': {
      background: 'rgba(76,175,80, 0.08)',
    },
  },
  logoRow: {
    justifyContent: 'center',
    padding: 0,
    minHeight: 200,
    '.is-compact &': {
      minHeight: 0,
    },
  },
  logo: {
    background: `url(${logo})`,
    backgroundSize: 'cover',
    height: 150,
    width: 150,
    '.is-compact &': {
      height: 50,
      width: 50,
    },
  },
  nav: {
    background: 'transparent',
  },
  sidebar: {
    '& .mdl-tabs__tab-bar': {
      flexDirection: 'column',
      alignItems: 'stretch',
      height: 'auto',
      borderBottom: 'none',
      padding: '4px 16px 8px 16px',
    },
    '& .mdl-tabs__tab': {
      textAlign: 'left',
    },
    '@media (max-width: 839px)': {
      display: 'none',
    },
  },
  content: {
    flex: '1',
    marginLeft: 24,
    '@media (max-width: 839px)': {
      marginLeft: 0,
    },
  },
})(Sample);
