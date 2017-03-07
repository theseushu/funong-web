import React, { PropTypes } from 'react';
import { Buttons, CapacityCountPriceCard, LocationCard, RangeNameCard, ImagesCard, RichTextCard, LabelsCard } from 'modules/common/form';
import injectSheet from 'react-jss';
import { labels } from '../constants';

const Form = (props) => {
  const { handleSubmit, pristine, submitting, invalid, sheet: { classes } } = props;
  return (
    <form className={classes.form}>
      <CapacityCountPriceCard />
      <RangeNameCard />
      <LocationCard title="常驻地" />
      <ImagesCard />
      <RichTextCard />
      <LabelsCard labels={Object.values(labels)} />
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
  },
})(Form);
