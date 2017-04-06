import React, { PropTypes } from 'react';
import _flatten from 'lodash/flatten';
import injectSheet from 'react-jss';
import { Buttons, CategorySpeciesNameCard, SpecsCard, ImagesCard, RichTextCard, AvailableLabelsCard, createKeywords } from 'modules/common/form';
import type, { labels, catalogGroups, FORM_NAME } from '../constants';

const Keywords = createKeywords(type, FORM_NAME);

const Form = (props) => {
  const { handleSubmit, pristine, submitting, invalid, sheet: { classes } } = props;
  return (
    <form className={classes.form}>
      <CategorySpeciesNameCard catalogs={_flatten(catalogGroups)} form={FORM_NAME} />
      <SpecsCard useMinimum={false} />
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
