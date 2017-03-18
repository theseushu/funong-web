import React, { PropTypes } from 'react';
import ServicesPart from './services';
import FeePart from './fee';

const Services = ({ services, serviceFee, onServiceChange, onServiceFeeChange, classes }) => {
  // there's no available service to chose
  if (services.length === 0) {
    return null;
  }
  return (
    <div className={`${classes.line} ${classes.services}`}>
      <ServicesPart services={services} onServiceChange={onServiceChange} />
      <FeePart services={services} serviceFee={serviceFee} onServiceFeeChange={onServiceFeeChange} />
    </div>
  );
};

Services.propTypes = {
  classes: PropTypes.object.isRequired,
  services: PropTypes.array.isRequired,
  serviceFee: PropTypes.number,
  onServiceChange: PropTypes.func,
  onServiceFeeChange: PropTypes.func,
};

export default Services;
