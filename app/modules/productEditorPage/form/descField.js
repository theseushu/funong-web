import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';

import FormControl from 'react-bootstrap/lib/FormControl';
import Field from './field';

const styles = {

};

const DescField = ({ input: { value, onChange }, meta }) => (
  <Field label="描述" required meta={meta}>
    <FormControl
      componentClass="textarea"
      placeholder="请详细描述您的产品。详尽的描述更能引起客户的关注哦"
      value={value}
      onChange={onChange}
      rows={4}
      maxLength={5000}
    />
  </Field>
  );

DescField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
};

export default injectSheet(styles)(DescField);
