import React, { PropTypes } from 'react';
import { Fields, Field } from 'redux-form';
import Button from 'react-mdl/lib/Button';
import { Card, CardTitle, CardActions } from 'react-mdl/lib/Card';
import injectSheet from 'react-jss';
import CategorySpeciesName from './categorySpeciesName';
import LocationField from './locationField';
import DescField from './descField';
import SpecsField from './specsField';
import AvailableField from './availableField';
import LabelsField from './labelsField';
import styles, { breakpoints } from '../../common/styles';

const Form = (props, { router }) => {
  const { handleSubmit, pristine, submitting, submitSucceeded, invalid, error, sheet: { classes } } = props;
  return (
    <Card shadow={0} style={{ width: '100%' }}>
      <CardTitle>
        货品信息
      </CardTitle>
      <form className={classes.form}>
        <Fields names={['category', 'species', 'name']} component={CategorySpeciesName} sheet={{ classes }} />
        <Field name="specs" component={SpecsField} sheet={{ classes }} />
        <Field name="location" component={LocationField} sheet={{ classes }} />
        <Field name="desc" component={DescField} sheet={{ classes }} />
        <Field name="available" component={AvailableField} sheet={{ classes }} />
        <Field name="labels" component={LabelsField} sheet={{ classes }} />
        {
          error && (
            <p className={'text-center text-danger'}>
              <span>{error.message}</span>
            </p>
          )
        }
        {
          submitSucceeded && (
            <p className={'text-center text-info'}>
              <span>{'保存成功，请稍候'}</span>
            </p>
          )
        }
      </form>
      <CardActions className={classes.actions}>
        <Button
          type="submit" accent
          disabled={pristine || invalid || submitting}
          onClick={(e) => { e.preventDefault(); handleSubmit(); }}
        >{submitting ? '正在处理...' : '确定'}</Button>
        <Button
          type="cancel" accent
          onClick={(e) => { e.preventDefault(); router.goBack(); }}
        >取消</Button>
      </CardActions>
    </Card>
  );
};

Form.contextTypes = {
  router: PropTypes.object.isRequired,
};

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
  invalid: PropTypes.bool,
  error: PropTypes.any,
  sheet: PropTypes.object.isRequired,
};

export default injectSheet({
  form: {
    width: '100%',
    maxWidth: 500,
    margin: '0 auto',
    '& input': {
      cursor: 'text',
    },
    '& > div': {
      width: '100%',
      boxSizing: 'border-box',
    },
  },
  field: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 12,
  },
  fieldContent: {
    flex: 1,
    margin: '0 24px',
    [breakpoints.mediaDestkopBelow]: {
      margin: '0 16px',
    },
    [breakpoints.mediaTabletBelow]: {
      margin: '0 0',
    },
  },
  actions: {
    width: '100%',
    maxWidth: 500,
    margin: '0 auto',
    textAlign: 'right',
  },
})(Form);
