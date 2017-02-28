import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { colors } from 'modules/common/styles';
import Sort from './sort';
import Paging from './paging';
import moduleStyles from '../styles';

const SortAndPaging = ({ classes, selected, onSelect, onClear, onPageSelected, page, pageSize, countingState }) => (
  <div className={classes.line}>
    <div className={classes.content}>
      <Sort
        onSelect={onSelect}
        onClear={onClear}
        selected={selected}
      />
      <Paging
        page={page}
        pageSize={pageSize}
        countingState={countingState}
        classes={classes}
        onSelect={onPageSelected}
      />
    </div>
  </div>
  );

SortAndPaging.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.object,
  countingState: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  onPageSelected: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default injectSheet({
  paging: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.colorSubTitle,
  },
  ...moduleStyles,

})(SortAndPaging);
