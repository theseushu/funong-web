import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Tabs, Tab } from 'react-mdl/lib/Tabs';
import Button from 'react-mdl/lib/Button';
import Link from 'react-router/lib/Link';
import Page from '../../page';
import { breakpoints } from '../../../common/styles';

class Supply extends Component { // eslint-disable-line
  static propTypes = {
    sheet: PropTypes.object.isRequired,
  }
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }
  render() {
    const { sheet: { classes } } = this.props;
    const { router } = this.context;
    return (
      <Page smallContent={false}>
        <div className={classes.content}>
          <Tabs
            activeTab={1} onChange={(tabId) => {
              if (tabId === 0) {
                router.push('/me/products/supply');
              }
            }} ripple
          >
            <Tab>农资农产供应</Tab>
            <Tab>微店商品</Tab>
          </Tabs>
          <div>
            <Link to="/supply/new"><Button colored>添加</Button></Link>
          </div>
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
})(Supply);
