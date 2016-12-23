import React, { PropTypes } from 'react';
import RaisingButton from '../../raisingButton';

const Types = ({ classes, catalogTypes, catalogType, onButtonClick }) => (
  <div className={classes.catalogTypes}>
    <span>
      {
          catalogTypes.map((type, i) => (
            <RaisingButton
              key={i}
              label={catalogType.name}
              active={catalogType === type}
              onClick={() => {
                onButtonClick({ catalogType });
              }}
            />
          ))
        }
    </span>
  </div>
  );

Types.propTypes = {
  classes: PropTypes.object.isRequired,
  catalogTypes: PropTypes.array.isRequired,
  catalogType: PropTypes.object.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default Types;
