import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Card, CardTitle } from 'react-mdl/lib/Card';
import Icon from 'react-mdl/lib/Icon';
import { Tabs, Tab } from 'react-mdl/lib/Tabs';
import { breakpoints } from 'modules/common/styles';
import { certsSelector } from 'modules/data/ducks/selectors';
import { certTypes } from 'appConstants';
import Page from '../page';
import Personal from './personal';
import Company from './company';
import Expert from './expert';


class Certs extends Component {
  static propTypes = {
    sheet: PropTypes.object,
    location: PropTypes.object,
  }
  static contextTypes = {
    router: PropTypes.object,
  }
  constructor(props) {
    super(props);
    const { location } = props;
    this.state = { activeTab: this.tabIndex(location) };
  }
  componentWillReceiveProps({ location }) {
    this.setState({ activeTab: this.tabIndex(location) });
  }
  onTabChanged = (tabId) => {
    let type;
    switch (tabId) {
      case 0:
        type = certTypes.personal;
        break;
      case 1:
        type = certTypes.company;
        break;
      case 2:
        type = certTypes.product;
        break;
      case 3:
        type = certTypes.expert;
        break;
      default:
        type = certTypes.personal;
    }
    const { router } = this.context;
    router.push(`/me/certs?type=${type}`);
  }
  tabIndex = ({ query }) => {
    const type = query ? query.type : certTypes.personal;
    let activeTab;
    switch (type) {
      case certTypes.personal:
        activeTab = 0;
        break;
      case certTypes.company:
        activeTab = 1;
        break;
      case certTypes.product:
        activeTab = 2;
        break;
      case certTypes.expert:
        activeTab = 3;
        break;
      default:
        activeTab = 0;
    }
    return activeTab;
  }
  render() {
    const { sheet: { classes } } = this.props;
    const { activeTab } = this.state;
    return (
      <Page>
        <div className={classes.content}>
          <Card shadow={2} style={{ width: '100%', margin: 'auto' }}>
            <CardTitle>
              实名认证
            </CardTitle>
            <Tabs activeTab={activeTab} className={classes.tab} onChange={this.onTabChanged} ripple>
              <Tab><span>个人<Icon name="check_circle" style={{ fontSize: '1em' }} /></span></Tab>
              <Tab>商家</Tab>
              <Tab>产品</Tab>
              <Tab>专家</Tab>
            </Tabs>
            {activeTab === 0 && <Personal />}
            {activeTab === 1 && <Company />}
            {activeTab === 3 && <Expert />}
          </Card>
        </div>
      </Page>
    );
  }
}

export default injectSheet({
  content: {
    flex: '1',
    marginLeft: 24,
    [breakpoints.mediaDestkopBelow]: {
      marginLeft: 0,
    },
  },
  tab: {
    '& .mdl-tabs__tab-bar': {
      borderBottom: 'none',
    },
  },
  text: {
    marginTop: 0,
    fontSize: 'smaller',
    paddingLeft: 0,
    listStyle: 'none',
  },
})(connect(
  (state) => ({ certs: certsSelector(state) })
)(Certs));
