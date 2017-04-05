import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Card, CardTitle } from 'react-mdl/lib/Card';
import Icon from 'react-mdl/lib/Icon';
import { Tabs, Tab } from 'react-mdl/lib/Tabs';
import styles, { breakpoints } from 'modules/common/styles';
import { statusValues, certTypes } from 'appConstants';
import Header from '../header';
import Page from '../page';
import Personal from './personal';
import Company from './company';
import Expert from './expert';
import { personal as personalSelector, company as companySelector, expert as expertSelector } from './selectors';


class Certs extends Component {
  static propTypes = {
    sheet: PropTypes.object,
    location: PropTypes.object,
    personal: PropTypes.object,
    company: PropTypes.object,
    expert: PropTypes.object,
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
        type = certTypes.personal.value;
        break;
      case 1:
        type = certTypes.company.value;
        break;
      case 2:
        type = certTypes.expert.value;
        break;
      case 3:
        type = certTypes.product.value;
        break;
      default:
        type = certTypes.personal.value;
    }
    const { router } = this.context;
    router.push(`/me/certs?type=${type}`);
  }
  tabIndex = ({ query }) => {
    const type = query ? query.type : certTypes.personal.value;
    let activeTab;
    switch (type) {
      case certTypes.personal.value:
        activeTab = 0;
        break;
      case certTypes.company.value:
        activeTab = 1;
        break;
      case certTypes.expert.value:
        activeTab = 2;
        break;
      case certTypes.product.value:
        activeTab = 3;
        break;
      default:
        activeTab = 0;
    }
    return activeTab;
  }
  renderCertIcon = (cert) => {
    if (!cert) {
      return null;
    }
    switch (cert.status) {
      case statusValues.unverified.value:
        return null;
      case statusValues.verified.value:
        return <Icon name="check_circle" className={styles.colorVerified} />;
      case statusValues.rejected.value:
        return <Icon name="remove_circle" className={styles.colorRejected} />;
      default:
        return null;
    }
  }
  render() {
    const { personal, company, expert, sheet: { classes } } = this.props;
    const { activeTab } = this.state;
    return (
      <Page header={<Header />}>
        <div className={classes.content}>
          <Card shadow={2} style={{ width: '100%', margin: 'auto' }}>
            <CardTitle>
              实名认证
            </CardTitle>
            <Tabs activeTab={activeTab} className={classes.tab} onChange={this.onTabChanged} ripple>
              <Tab><span className={classes.tabLink}>个人{this.renderCertIcon(personal)}</span></Tab>
              <Tab><span className={classes.tabLink}>商家{this.renderCertIcon(company)}</span></Tab>
              {/* <Tab>产品</Tab> */}
              <Tab><span className={classes.tabLink}>专家{this.renderCertIcon(expert)}</span></Tab>
            </Tabs>
            {activeTab === 0 && <Personal />}
            {activeTab === 1 && <Company />}
            {activeTab === 2 && <Expert />}
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
  tabLink: {
    display: 'flex',
    alignItems: 'center',
    '& > i': {
      fontSize: '1em',
    },
  },
  text: {
    marginTop: 0,
    fontSize: 'smaller',
    paddingLeft: 0,
    listStyle: 'none',
  },
})(connect(
  (state) => ({ personal: personalSelector(state), company: companySelector(state), expert: expertSelector(state) })
)(Certs));
