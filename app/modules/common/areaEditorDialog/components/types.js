import React, { PropTypes } from 'react';
import { districtLevels } from 'appConstants';
import RaisingButton from '../../raisingButton';

const Types = ({ level, onButtonClick }) => (
  <div>
    {Object.values(districtLevels).map(({ title, value }, i) =>
      <RaisingButton key={i} label={title} active={value === level} onClick={(e) => { e.preventDefault(); onButtonClick(value); }} />
    )}
  </div>
);

Types.propTypes = {
  level: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default Types;
