import React, { PropTypes } from 'react';
import _map from 'lodash/map';
import Link from 'react-router/lib/Link';
import LabelWithBorder from 'modules/common/label/labelWithBorder';
import allSorts from '../sorts';

const Sort = ({ sorts = allSorts, selected, onSelect, onClear }) => {
  if (!sorts || Object.keys(sorts).length < 1) {
    return null;
  }
  return (
    <div>
      <Link
        to={'/supplies'}
        onClick={(e) => {
          e.preventDefault();
          onClear();
        }}
      ><LabelWithBorder accent={!selected}>综合排序</LabelWithBorder></Link>
      {_map(sorts, ((s, key) =>
        <Link
          key={key}
          onClick={(e) => {
            e.preventDefault();
            onSelect({ sort: s.sort, order: s.order });
          }}
          to={`/supplies?sort=${s.sort}&order=${s.order}`}
        ><LabelWithBorder accent={selected && (selected.sort === s.sort)}>{s.title}</LabelWithBorder></Link>
      ))}
    </div>
  );
};

Sort.propTypes = {
  sorts: PropTypes.object,
  selected: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default Sort;
