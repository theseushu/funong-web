import React, { PropTypes } from 'react';
import _find from 'lodash/find';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-mdl/lib/Tabs';
import { browserHistory } from 'react-router';
import { currentUserSelector, usersSelector } from 'modules/data/ducks/selectors';
import styles from 'modules/common/styles';
import { Layout } from 'modules/common/layouts';
import { MainLeft } from 'modules/common/layout';
import UserCard from 'modules/common/user/card';
import PublishesPage from 'modules/common/publishes/page';
import LoadingDiv from 'modules/common/glossary/loadingDiv';
import { selectors } from './ducks';
import types from './tabTypes';

const typeToTabIndex = (type) => types.indexOf(type);

const UserPage = ({ user, pagingState, type, onTabChange }, { router }) => (
  <Layout
    helmet={{ title: `富农商城-${user.name}` }}
    smallContent={false}
    onReturn={() => {
      router.goBack();
    }}
  >
    {
      <MainLeft
        left={<UserCard user={user} />}
        main={
          <div>
            <Tabs activeTab={typeToTabIndex(type)} onChange={(i) => onTabChange(types[i])} ripple>
              <Tab>供应</Tab>
              <Tab>乡村游</Tab>
              <Tab>物流</Tab>
              <Tab>采购</Tab>
            </Tabs>
            <section>
              <LoadingDiv pending={pagingState.pending} className={styles.mt24}>
                {pagingState.result && <PublishesPage type={type} page={pagingState.result} />}
              </LoadingDiv>
            </section>
          </div>
        }
      />
    }
  </Layout>
);

UserPage.contextTypes = {
  router: PropTypes.object.isRequired,
};
UserPage.propTypes = {
  pagingState: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

const pageStateSelector = selectors.pageState;
const createPageProductsSelector = selectors.createPageProductsSelector;
const pageInquiriesStateSelector = selectors.pageInquiries;
export default connect(
  (state, { params: { id }, location: { pathname, query } }) => {
    const type = pageStateSelector(state).type;
    return {
      type: pageStateSelector(state).type,
      user: _find(usersSelector(state), (u) => u.objectId === id),
      currentUser: currentUserSelector(state),
      pagingState: type === 'inquiry' ? pageInquiriesStateSelector(state) : createPageProductsSelector(pageStateSelector(state).type)(state),
      onTabChange: (i) => browserHistory.replace({ pathname, query: { t: i } }),
      onPageChange: (p) => browserHistory.replace({ pathname, query: { ...query, p } }),
    };
  },
)(UserPage);
