import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { SelectorButton } from 'modules/common/categories';

const CriteriaCategory = ({ classes, catalogGroups, selected, onSelect }) => (
  <span className={classes.wrapper}>
    <SelectorButton catalogGroups={catalogGroups} selected={selected} onSelect={onSelect}>全部分类</SelectorButton>
  </span>
);

CriteriaCategory.propTypes = {
  selected: PropTypes.shape({
    name: PropTypes.string.isRequired,
    objectId: PropTypes.string.isRequired,
    catalog: PropTypes.string.isRequired,
  }),
  catalogGroups: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  wrapper: {
    display: 'inline-block',
  },
  label: {
    marginLeft: 16,
  },
})(CriteriaCategory);
