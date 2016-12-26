import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

const styles = {

};

const DescField = ({ name, input: { value, onChange }, meta: { dirty, error } }) => {
  const showError = (!!dirty) && (!!error);
  return (
    <FormGroup validationState={showError ? 'error' : undefined}>
      <ControlLabel>描述</ControlLabel>
      <FormControl
        componentClass="textarea"
        placeholder="请详细描述您的产品。详尽的描述更能引起客户的关注哦"
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
      />
      {showError && <HelpBlock>{error}</HelpBlock>}
    </FormGroup>
  );
};

DescField.propTypes = {
  name: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
};

export default injectSheet(styles)(DescField);
