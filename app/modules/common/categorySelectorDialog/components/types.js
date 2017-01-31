import React, { PropTypes } from 'react';
import { catalogTypes } from '../../../../constants';
import RaisingButton from '../../raisingButton';

const supplyTypes = catalogTypes.supply;

const Types = ({ catalogType, onButtonClick }) => (
  <div>
    {Object.values(supplyTypes).map(({ title, value }, i) =>
      <RaisingButton key={i} label={title} active={value === catalogType} onClick={(e) => { e.preventDefault(); onButtonClick(value); }} />
    )}
  </div>
);

Types.propTypes = {
  catalogType: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default Types;
