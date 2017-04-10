import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFormValues, initialize as initializeAC } from 'redux-form';
import _flatten from 'lodash/flatten';
import injectSheet from 'react-jss';
import { Buttons, CategorySpeciesNameCard, SpecsCard, ImagesCard, RichTextCard, AvailableLabelsCard, createKeywords, StartEndAtCard } from 'modules/common/form';
import type, { catalogGroups, FORM_NAME, EMPTY_PRODUCT, generateFromOriginal } from '../constants';
import OriginalSelector from './originalSelector';

const Keywords = createKeywords(type, FORM_NAME);

const Form = (props) => {
  const { formValues, initialize, handleSubmit, pristine, submitting, invalid, classes } = props;
  const { objectId, original } = formValues;
  return (
    <form className={classes.form}>
      {!objectId && <OriginalSelector
        value={original}
        onChange={(o) => {
          if (!o) {
            initialize(EMPTY_PRODUCT);
          } else {
            initialize(generateFromOriginal(o));
          }
        }}
      />}
      {
        original && (
          <div>
            <StartEndAtCard />
            <CategorySpeciesNameCard
              catalogs={_flatten(catalogGroups)} form={FORM_NAME}
              readOnly={{ category: true, species: true, name: false }}
            />
            <SpecsCard useMinimum={false} selector specs={!objectId ? original.specs : []} />
            <ImagesCard />
            <RichTextCard />
            <AvailableLabelsCard labels={[]} />
            <Keywords />
            <Buttons handleSubmit={handleSubmit} pristine={pristine} submitting={submitting} invalid={invalid} />
          </div>
        )
      }
    </form>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  invalid: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  formValues: PropTypes.object.isRequired,
  initialize: PropTypes.func.isRequired,
};

export default injectSheet({
  form: {
    width: '100%',
    maxWidth: 700,
    margin: 'auto',
  },
})(connect(
  (state, { form }) => ({ formValues: getFormValues(form)(state) }),
  (dispatch, { form }) => bindActionCreators({ initialize: (data) => initializeAC(form, data, false) }, dispatch),
)(Form));
