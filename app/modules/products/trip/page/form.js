import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Buttons, LocationNameCard, ImagesCard, RichTextCard, AvailableLabelsCard, createKeywords } from 'modules/common/form';
import type, { labels, FORM_NAME } from '../constants';

const Keywords = createKeywords(type, FORM_NAME);

const Form = (props) => {
  const { handleSubmit, pristine, submitting, invalid, sheet: { classes } } = props;
  return (
    <form className={classes.form}>
      <LocationNameCard />
      <ImagesCard />
      <RichTextCard />
      <AvailableLabelsCard labels={Object.values(labels)} />
      <Keywords />
      <Buttons handleSubmit={handleSubmit} pristine={pristine} submitting={submitting} invalid={invalid} />
    </form>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  sheet: PropTypes.object.isRequired,
};

export default injectSheet({
  form: {
    width: '100%',
    maxWidth: 700,
    margin: 'auto',
  },
})(Form);
