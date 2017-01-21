import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Card, CardTitle } from 'react-mdl/lib/Card';
import Icon from 'react-mdl/lib/Icon';
import { Tabs, Tab } from 'react-mdl/lib/Tabs';
import { breakpoints } from '../../common/styles';
import { certsSelector } from '../../data/ducks/selectors';
import Personal from './personal';


class Certs extends Component {
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
      <div className={classes.content}>
        <Card shadow={2} style={{ width: '100%', margin: 'auto' }}>
          <CardTitle>
            实名认证
          </CardTitle>
          <Tabs activeTab={this.state.activeTab} className={classes.tab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
            <Tab><span>个人<Icon name="check_circle" style={{ fontSize: '1em' }} /></span></Tab>
            <Tab>个体</Tab>
            <Tab>企业</Tab>
          </Tabs>
          <Personal />
        </Card>
      </div>
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
