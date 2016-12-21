import React, { PropTypes } from 'react';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';


const priceField = ({ name, input: { value, onChange }, meta: { dirty, error } }) => {
  const showError = (!!dirty) && (!!error);
  return (
    <FormGroup validationState={showError ? 'error' : undefined}>
      <ControlLabel>货品单价</ControlLabel>
      <InputGroup>
        <FormControl placeholder="点击选择" type="tel" name={name} value={value} maxLength={11} onChange={(e) => onChange(e.target.value)} />
        <DropdownButton
          componentClass={InputGroup.Button}
          id="input-dropdown-addon"
          title="Action"
        >
          <MenuItem key="1">Item</MenuItem>
        </DropdownButton>
      </InputGroup>
      {showError && <HelpBlock>{error}</HelpBlock>}
    </FormGroup>
  );
};

priceField.propTypes = {
  name: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
};

export default priceField;
