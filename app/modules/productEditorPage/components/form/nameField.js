import React, { PropTypes } from 'react';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
// import InputGroup from 'react-bootstrap/lib/InputGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';


const NameField = ({ name, input: { value, onChange }, meta: { dirty, error } }) => {
  const showError = (!!dirty) && (!!error);
  return (
    <FormGroup validationState={showError ? 'error' : undefined}>
      <ControlLabel>货品名称</ControlLabel>
      <FormControl placeholder="点击选择" type="tel" name={name} value={value} maxLength={11} onChange={(e) => onChange(e.target.value)} />
      {showError && <HelpBlock>{error}</HelpBlock>}
    </FormGroup>
  );
};

NameField.propTypes = {
  name: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
};

export default NameField;
