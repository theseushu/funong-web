import React, { PropTypes } from 'react';
import _map from 'lodash/map';
import injectSheet from 'react-jss';
import { breakpoints } from 'modules/common/styles';
import StatefulOrder from './order';
import Page from '../page';
import Header from '../header';

const Orders = ({ location, user, orders, classes }) => (
  <Page
    location={location}
    helmet={{
      title: '聚农商-历史订单',
      script: [
        { id: 'spay-script', src: 'https://jspay.beecloud.cn/1/pay/jsbutton/returnscripts?appId=5cf8154e-b7e6-4443-a421-f922ca52a0fb' },
      ],
    }}
    header={<Header />}
    smallContent={false}
  >
    <div className={classes.content}>
      {
      _map(orders, (order, i) => (
        <StatefulOrder
          key={i}
          user={user}
          order={order}
        />
      ))
    }
    </div>
  </Page>
);

Orders.propTypes = {
  classes: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default injectSheet({
  content: {
    flex: '1',
    marginLeft: 24,
    [breakpoints.mediaDestkopBelow]: {
      marginLeft: 0,
    },
  },
})(Orders);
