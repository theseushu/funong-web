import React, { PropTypes } from 'react';
import { catalogTypes } from 'appConstants';
import RaisingButton from '../../raisingButton';

const Types = ({ type, catalogType, onButtonClick }) => (
  <div>
    {Object.values(catalogTypes[type]).map(({ title, value }, i) =>
      <RaisingButton key={i} label={title} active={value === catalogType} onClick={(e) => { e.preventDefault(); onButtonClick(value); }} />
    )}
  </div>
);

Types.propTypes = {
  type: PropTypes.oneOf(Object.keys(catalogTypes)),
  catalogType: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default Types;
