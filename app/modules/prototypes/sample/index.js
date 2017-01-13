import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Layout, Content } from 'react-mdl/lib/Layout';
import { Card, CardTitle, CardMedia, CardActions } from 'react-mdl/lib/Card';
import Button from 'react-mdl/lib/Button';
import IconButton from 'react-mdl/lib/IconButton';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import Tooltip from 'react-mdl/lib/Tooltip';
import { Footer, FooterLinkList, FooterSection } from 'react-mdl/lib/Footer';

import styles, { breakpoints } from '../common/styles';

import SideMenu from './sideMenu';
import { AppHeader, AppDrawer } from './appHeader';

import avatar from '../assets/107013075633.jpg';

class Sample extends Component {
  static propTypes = {
    sheet: PropTypes.object,
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
            <SideMenu activeTab={this.state.activeTab} onChange={(activeTab) => this.setState({ activeTab })} />
            <div className={classes.content}>
              <Card shadow={2} style={{ width: '100%', margin: 'auto' }}>
                <CardTitle>
                  <h2 className="mdl-card__title-text">个人信息</h2>
                  <Tooltip label={<span>点击条目内容即可开始修改<br />您也可以点击图像更换新的头像</span>}>
                    <IconButton colored name="help_outline"></IconButton>
                  </Tooltip>
                </CardTitle>
                <CardMedia className={styles.contentCenter} style={{ background: 'none', padding: 16 }}>
                  <img role="presentation" style={{ width: 160, height: 160, borderRadius: '50%' }} src={avatar} />
                </CardMedia>
                <CardActions border>
                  <Grid style={{ width: '100%', boxSizing: 'border-box' }}>
                    <Cell component="h6" col={2} offsetDesktop={2} tablet={3} phone={4} style={{ display: 'flex', alignItems: 'center' }}>
                      手机号
                    </Cell>
                    <Cell col={6} offsetDesktop={2} tablet={5} phone={3} offsetPhone={1} style={{ textAlign: 'left' }}>
                      <Button colored>13012345678</Button>
                    </Cell>
                    <Cell component="h6" col={2} offsetDesktop={2} tablet={3} phone={4} style={{ display: 'flex', alignItems: 'center' }}>
                      您的称呼
                    </Cell>
                    <Cell col={6} offsetDesktop={2} tablet={5} phone={3} offsetPhone={1} style={{ textAlign: 'left' }}>
                      <Button colored>胡小为</Button>
                    </Cell>
                    <Cell component="h6" col={2} offsetDesktop={2} tablet={3} phone={4} style={{ display: 'flex', alignItems: 'center' }}>
                      行业类型
                    </Cell>
                    <Cell col={6} offsetDesktop={2} tablet={5} phone={3} offsetPhone={1} style={{ textAlign: 'left' }}>
                      <Button colored>批发商</Button>
                      <Button colored>代办</Button>
                      <Button colored>代卖</Button>
                    </Cell>
                    <Cell component="h6" col={2} offsetDesktop={2} tablet={3} phone={4} style={{ display: 'flex', alignItems: 'center' }}>
                      修改密码
                    </Cell>
                    <Cell col={6} offsetDesktop={2} tablet={5} phone={3} offsetPhone={1} style={{ textAlign: 'left' }}>
                      <Button colored>验证手机号码后开始</Button>
                    </Cell>
                    <Cell component="h6" col={2} offsetDesktop={2} tablet={3} phone={4} style={{ display: 'flex', alignItems: 'center' }}>
                      个人介绍
                    </Cell>
                    <Cell col={6} offsetDesktop={2} tablet={5} phone={3} offsetPhone={1} style={{ textAlign: 'left' }}>
                      <Button colored>介绍一下自己吧</Button>
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
  content: {
    flex: '1',
    marginLeft: 24,
    [breakpoints.mediaDestkopBelow]: {
      marginLeft: 0,
    },
  },
})(Sample);
