import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import FilesUpload from './filesUpload';
import { required } from '../../validations';

const Images = ({ input: { value, onChange }, meta: { error }, title }) => (
  <FilesUpload error={error} title={title} files={value || []} onChange={onChange} editing />
);

Images.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  title: PropTypes.string,
};

const ImagesCard = ({ ...props }) => <Field name="images" validate={[required]} component={Images} props={{ ...props }} />;

export default ImagesCard;
