import React, { PropTypes } from 'react';
import { Tabs, Tab } from 'react-mdl/lib/Tabs';
import injectSheet from 'react-jss';

const SideMenu = ({ sheet: { classes }, activeTab, onChange }) => (
  <div>
    <Tabs
      activeTab={activeTab} className={[classes.sidebar, 'mdl-shadow--2dp'].join(' ')}
      onChange={(tabId) => onChange(tabId)} ripple
    >
      <Tab>个人信息</Tab>
      <Tab>实名认证</Tab>
      <Tab>购物车</Tab>
      <Tab>历史订单</Tab>
      <Tab>我的收藏</Tab>
    </Tabs>
  </div>
);

SideMenu.propTypes = {
  sheet: PropTypes.object,
  activeTab: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};


export default injectSheet({
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
})(SideMenu);
