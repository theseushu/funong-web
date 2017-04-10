import React, { PropTypes } from 'react';
import _flatten from 'lodash/flatten';
import injectSheet from 'react-jss';
import { Buttons, CategorySpeciesNameCard, LocationCard, RangePriceEndAtCard, RichTextCard, createKeywords } from 'modules/common/form';
import type, { catalogGroups, FORM_NAME } from '../constants';

const Keywords = createKeywords(type, FORM_NAME);

const Form = (props) => {
  const { handleSubmit, pristine, submitting, invalid, sheet: { classes } } = props;
  return (
    <form className={classes.form}>
      <CategorySpeciesNameCard form={FORM_NAME} catalogs={_flatten(catalogGroups)} />
      <RangePriceEndAtCard
        title="货源地，价格"
        rangeTitle="货源地"
        rangeDialogTitle="选择货源地"
      />
      <LocationCard
        title="收货地"
        locationTitle="收货地"
        locationDialogTitle="选择地址"
      />
      <RichTextCard />
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
