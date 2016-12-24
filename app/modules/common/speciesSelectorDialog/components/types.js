import React, { PropTypes } from 'react';
import RaisingButton from '../../raisingButton';

const catalogTypes = [{
  name: '农产品',
}, {
  name: '农资',
}, {
  name: '物流',
},
];

const Types = ({ catalogType, onButtonClick }) => (
  <div>
    {
      catalogTypes.map(({ name }, i) => (
        <RaisingButton key={i} label={name} active={name === catalogType} onClick={() => onButtonClick(name)} />
      ))
    }
  </div>
  );

Types.propTypes = {
  catalogType: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default Types;
