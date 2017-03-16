import React, { PropTypes } from 'react';
import _flatten from 'lodash/flatten';
import injectSheet from 'react-jss';
import { Buttons, CategorySpeciesNameCard, SpecsCard, ImagesCard, RichTextCard, LabelsCard } from 'modules/common/form';
import { labels, catalogGroups, FORM_NAME } from '../constants';

const Form = (props) => {
  const { handleSubmit, pristine, submitting, invalid, sheet: { classes } } = props;
  return (
    <form className={classes.form}>
      <CategorySpeciesNameCard catalogs={_flatten(catalogGroups)} form={FORM_NAME} />
      <SpecsCard useMinimum={false} />
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
    margin: 'auto',
  },
})(Form);
