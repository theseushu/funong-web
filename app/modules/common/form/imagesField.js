import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import FilesUpload from 'modules/common/filesUpload';
import styles from 'modules/common/styles';
import { required } from './validations';

const Images = ({ input: { value, onChange }, meta: { error }, title }) => (
  <FilesUpload className={error ? styles.colorError : undefined} title={title} files={value || []} onChange={onChange} editing />
);

Images.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  title: PropTypes.string,
};

const ImagesField = ({ ...props }) => <Field name="images" validate={[required]} component={Images} props={{ ...props }} />;

export default ImagesField;
