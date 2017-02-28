import React, { PropTypes } from 'react';
import IconButton from 'react-mdl/lib/IconButton';
import styles from 'modules/common/styles';
import iconButtonLoading from 'assets/iconButtonLoading.gif';

const Paging = ({ page, pageSize, countingState, onSelect, classes }) => {
  if (page == null || pageSize == null) {
    return null;
  }
  const { pending, count } = countingState;
  if (pending) {
    return (
      <div className={classes.paging}>
        <img src={iconButtonLoading} width={32} height={32} role="presentation" />
      </div>
    );
  }
  if (count === 0) {
    return null;
  }
  const total = Math.ceil(count / pageSize);
  return (
    <div className={classes.paging}>
      <span className={styles.colorAccent}>{page}</span>/{total}
      { total > 1 && <IconButton name="navigate_before" disabled={page === 1} onClick={() => onSelect(page - 1)}></IconButton> }
      { total > 1 && <IconButton name="navigate_next" disabled={page === total} onClick={() => onSelect(page + 1)}></IconButton> }
    </div>
  );
}

Paging.propTypes = {
  classes: PropTypes.object.isRequired,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  countingState: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Paging;
