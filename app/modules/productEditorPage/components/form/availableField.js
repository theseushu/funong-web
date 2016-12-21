import React, { PropTypes } from 'react';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Radio from 'react-bootstrap/lib/Radio';


const AvailableField = ({ name, input: { value, onChange }, meta: { dirty, error } }) => {
  const showError = (!!dirty) && (!!error);
  return (
    <FormGroup validationState={showError ? 'error' : undefined}>
      <ControlLabel>是否现货</ControlLabel>
      <InputGroup>
        <Radio name={name} onChange={(e) => onChange(e.target.value)} inline>
          供应充足，现在即可发货
        </Radio>
        {' '}
        <Radio name={name} onChange={(e) => onChange(e.target.value)} inline>
          即将上市
        </Radio>
      </InputGroup>
      {showError && <HelpBlock>{error}</HelpBlock>}
    </FormGroup>
  );
};

AvailableField.propTypes = {
  name: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
};

export default AvailableField;
