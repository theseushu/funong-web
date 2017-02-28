import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import LabelWithBorder from 'modules/common/label/labelWithBorder';

const sorts = [
  { title: '价格最低', sort: 'minPrice', order: 'asc' },
  { title: '最新', sort: 'updatedAt', order: 'desc' },
];

const Sort = ({ selected, onSelect, onClear }) => (
  <div>
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
);

Sort.propTypes = {
  selected: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default Sort;
