import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import LabelWithBorder from 'modules/common/label/labelWithBorder';
import moduleStyles from '../styles';

const sorts = [
  { title: '价格最低', sort: 'minPrice', order: 'asc' },
  { title: '最新', sort: 'updatedAt', order: 'desc' },
];

const Sort = ({ classes, selected, onSelect, onClear }) => (
  <div className={classes.line}>
    <div className={classes.content}>
      <Link
        to={'/supplies'}
        onClick={(e) => {
          e.preventDefault();
          onClear();
        }}
      ><LabelWithBorder accent={!selected}>综合排序</LabelWithBorder></Link>
      {sorts.map((s, i) =>
        <Link
          key={i}
          onClick={(e) => {
            e.preventDefault();
            onSelect({ sort: s.sort, order: s.order });
          }}
          to={`/supplies?sort=${s.sort}&order=${s.order}`}
        ><LabelWithBorder accent={selected && (selected.sort === s.sort)}>{s.title}</LabelWithBorder></Link>
        )}
    </div>
  </div>
  );

Sort.propTypes = {
  classes: PropTypes.object.isRequired,
  selected: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default injectSheet(moduleStyles)(Sort);
