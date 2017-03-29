import React, { PropTypes } from 'react';
import IconButton from 'react-mdl/lib/IconButton';
import styles from 'modules/common/styles';

const Paging = ({ result: { page, totalPages, first, last }, onSelect, classes }) => {
  if (totalPages === 0) {
    return null;
  }
  return (
    <div className={classes.paging}>
      <span className={styles.colorAccent}>{page}</span>/{totalPages}
      { !first && <IconButton name="navigate_before" onClick={() => onSelect(page - 1)}></IconButton> }
      { !last && <IconButton name="navigate_next" onClick={() => onSelect(page + 1)}></IconButton> }
    </div>
  );
};

Paging.propTypes = {
  classes: PropTypes.object.isRequired,
  result: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Paging;
