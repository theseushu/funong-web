import React, { Component, PropTypes } from 'react';
import _isEqual from 'lodash/isEqual';
import styles from 'modules/common/styles';
import LoadingDiv from 'modules/common/glossary/loadingDiv';
import Pagination from 'modules/common/pagination';

class Page extends Component {
  /**
   * A severe problem has been encountered:
   * Without immutablejs, paging results are considered changed even if they are actually the same
   * (
   *  store state could be like { page: 1, pageSize: 24, result: ['id1', 'id2'] }
   *  the 'result' will be mapped to objects in normalizr entities(by selector), passes to component like { page: 1, pageSize: 24, result: [{..}, {...}] }
   *  This could cause component to re-render, thus lose inner state.
   *  Its creates a new object every time. Using immutablejs could avoid this problem
   *  Another solution would be using no inner state
   *  Here I do a deep compare to prevent those unnecessary re-render. Not an ideal way, but seems good enough
   * )
   */
  shouldComponentUpdate(nextProps) {
    const current = {
      page: this.props.page,
      pending: this.props.pending,
    };
    const next = {
      page: nextProps.page,
      pending: nextProps.pending,
    };
    return !_isEqual(next, current);
  }
  render() {
    const { pending, page, empty, List, onPageChange } = this.props;
    const { router } = this.context;
    return (
      <LoadingDiv pending={pending} className={styles.w100} style={{ minHeight: 102 }}>
        { page && page.results && page.results.length > 0 && <List entries={page.results} /> }
        { !pending && page && (page.total === 0 || page.results.length === 0) && empty }
        {
          page && (
            <Pagination
              current={page.page}
              total={page.totalPages}
              boundary={1}
              sibling={2}
              onChange={(pageNumber) => {
                if (onPageChange) {
                  onPageChange(pageNumber);
                } else {
                  const location = router.getCurrentLocation();
                  router.push({ pathname: location.pathname, query: { ...location.query, page: pageNumber } });
                }
              }}
            />
          )
        }
      </LoadingDiv>
    );
  }
}

Page.contextTypes = {
  router: PropTypes.object.isRequired,
};

Page.propTypes = {
  pending: PropTypes.bool,
  page: PropTypes.object,
  empty: PropTypes.element.isRequired,
  List: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
  onPageChange: PropTypes.func,
};

export default Page;

export NoResult from './noResult';
