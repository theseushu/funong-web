import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Tabs, Tab } from 'react-mdl/lib/Tabs';
import Textfield from 'react-mdl/lib/Textfield';
import Button from 'react-mdl/lib/Button';

import Avatar from '../../common/avatar';
import styles, { colors } from '../../common/styles';

import avatar from '../../assets/107013075633.jpg';

import Info from './info';
import Subscriptions from './subscriptions';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
  }
  render() {
    const { sheet: { classes } } = this.props;
    const { activeTab } = this.state;
    return (
      <div>
        <div className={styles.contentCenter} style={{ flexWrap: 'wrap' }}>
          <div style={{ width: 160, height: 80 }}>
            <div style={{ position: 'absolute', height: 160, top: -80, width: 160 }}>
              <Avatar user={{ avatar: { url: avatar } }} shadow={3} />
            </div>
          </div>
          <h4>胡小为</h4>
        </div>
        <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
          <Tab>账户信息</Tab>
          <Tab>我的关注</Tab>
          <Tab>收藏</Tab>
        </Tabs>
        { activeTab === 0 ? <Info /> : null }
        { activeTab === 1 ? <Subscriptions /> : null }
      </div>
    );
  }
}

Account.propTypes = {
  sheet: PropTypes.object.isRequired,
};

export default injectSheet({})(Account);
