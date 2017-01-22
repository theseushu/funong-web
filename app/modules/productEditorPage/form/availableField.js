import React, { PropTypes } from 'react';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Radio from 'react-bootstrap/lib/Radio';


const AvailableField = ({ input: { value, onChange }, meta: { dirty, error } }) => {
  const showError = (!!dirty) && (!!error);
  return (
    <FormGroup validationState={showError ? 'error' : undefined}>
      <ControlLabel>是否现货</ControlLabel>
      <InputGroup>
        <Radio name={'available'} checked={value} onChange={() => onChange(true)} inline>
          供应充足，现在即可发货
        </Radio>
        {' '}
        <Radio name={'available'} checked={!value} onChange={() => onChange(false)} inline>
          即将上市
        </Radio>
      </InputGroup>
      {showError && <HelpBlock>{error}</HelpBlock>}
    </FormGroup>
  );
};

AvailableField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
};

export default AvailableField;
