import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { colors } from 'modules/common/styles';
import Sort from './sort';
import Paging from './paging';
import moduleStyles from '../styles';

const SortAndPaging = ({ classes, sorts, selected, onSelect, onClear, onPageSelected, page, pageSize, result }) => (
  <div className={classes.line}>
    <div className={classes.content}>
      <Sort
        sorts={sorts}
        onSelect={onSelect}
        onClear={onClear}
        selected={selected}
      />
      {result && (
        <Paging
          result={result}
          classes={classes}
          onSelect={onPageSelected}
        />
      )}
    </div>
  </div>
  );

SortAndPaging.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.object,
  result: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  onPageSelected: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  sorts: PropTypes.object,
};

export default injectSheet({
  paging: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    marginLeft: 24,
    alignItems: 'center',
    color: colors.colorSubTitle,
  },
  ...moduleStyles,

})(SortAndPaging);
