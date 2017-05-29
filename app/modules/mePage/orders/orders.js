import React, { PropTypes } from 'react';
import _map from 'lodash/map';
import _find from 'lodash/find';
import injectSheet from 'react-jss';
import Checkbox from 'react-mdl/lib/Checkbox';
import { breakpoints } from 'modules/common/styles';
import OrdersPage, { NoResult } from 'modules/common/page';
import StatefulOrder from './order';
import Page from '../page';
import Header from '../header';
import PayButton from './payButton';

const Orders = ({ location, user, pending, result, selected, select, deselect, classes }) => (
  <Page
    location={location}
    helmet={{
      title: '富农商城-历史订单',
      script: [
          { id: 'spay-script', src: 'https://jspay.beecloud.cn/1/pay/jsbutton/returnscripts?appId=5cf8154e-b7e6-4443-a421-f922ca52a0fb' },
      ],
    }}
    header={<Header />}
    smallContent={false}
  >
    <div>
      <div>
        <PayButton orders={(result.results || []).filter((o) => !!_find(selected, (s) => s === o.objectId))} />
      </div>
      <OrdersPage
        pending={pending}
        page={{ ...result, selected }}
        empty={<NoResult />}
        List={({ entries }) => (
          <div className={classes.content}>
            {
                _map(entries, (order, i) => {
                  const checked = selected.indexOf(order.objectId) > -1;
                  return (
                    <div className={classes.order} key={i}>
                      <Checkbox
                        checked={checked}
                        onChange={() => {
                          if (checked) {
                            deselect(order.objectId);
                          } else {
                            select(order.objectId);
                          }
                        }}
                      />
                      <StatefulOrder
                        key={i}
                        user={user}
                        order={order}
                      />
                    </div>
                  );
                })
              }
          </div>
          )}
      >
      </OrdersPage>
    </div>
  </Page>
  );

Orders.propTypes = {
  classes: PropTypes.object.isRequired,
  pending: PropTypes.bool,
  result: PropTypes.object,
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  selected: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired,
  deselect: PropTypes.func.isRequired,
};

export default injectSheet({
  order: {
    display: 'flex',
    '& > .mdl-checkbox': {
      width: 24,
    },
  },
  content: {
    flex: '1',
    [breakpoints.mediaDestkopBelow]: {
      marginLeft: 0,
    },
  },
})(Orders);
