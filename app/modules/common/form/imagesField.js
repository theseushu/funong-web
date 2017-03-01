import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import FilesUpload from 'modules/common/filesUpload';
import styles from 'modules/common/styles';
import { required as requiredValidator } from './validations';

const Images = ({ input: { value, onChange }, meta: { error }, title }) => (
  <FilesUpload className={error ? styles.colorError : undefined} title={title} files={value || []} onChange={onChange} editing />
);

Images.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  title: PropTypes.string,
};

const ImagesField = ({ ...props, required = true }) => <Field name="images" validate={required ? [requiredValidator] : undefined} component={Images} props={{ ...props }} />;

ImagesField.propTypes = {
  required: PropTypes.bool,
};

export default ImagesField;
