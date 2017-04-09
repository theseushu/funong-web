import React, { PropTypes } from 'react';
import styles from 'modules/common/styles';
import LoadingDiv from 'modules/common/glossary/loadingDiv';
import Pagination from 'modules/common/pagination';

const Page = ({ pending, page, empty, List, onPageChange }, { router }) => (
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
