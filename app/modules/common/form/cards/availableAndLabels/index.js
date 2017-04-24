import React, { PropTypes } from 'react';
import _without from 'lodash/without';
import _find from 'lodash/find';
import { Field } from 'redux-form';
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card';
import Switch from 'react-mdl/lib/Switch';
import injectSheet from 'react-jss';
import { statusValues } from 'funong-common/lib/appConstants';
import moduleStyles from '../../moduleStyles';

const Available = ({ input: { value, onChange } }) => {
  const status = _find(statusValues, (s) => s.value === value) || statusValues.unavailable;
  const available = [statusValues.rejected.value, statusValues.removed.value, statusValues.unavailable.value].indexOf(status.value) < 0;
  return (
    <Switch
      ripple
      checked={available}
      disabled={status.value === statusValues.rejected}
      onChange={(e) => {
        if (e.target.checked) {
          onChange(statusValues.unverified.value);
        } else {
          onChange(statusValues.unavailable.value);
        }
      }}
    >{available ? '已上架' : status.title}</Switch>
  );
};

Available.propTypes = {
  input: PropTypes.object.isRequired,
};

const Labels = ({ classes, labels, input: { value, onChange } }) => (
  <div className={classes.labels}>
    {
        labels.map((label, i) => (
          <Switch
            key={i} ripple
            checked={value.indexOf(label.value) >= 0}
            onChange={(e) => {
              if (e.target.checked) {
                onChange([...value, label.value]);
              } else {
                onChange(_without(value, label.value));
              }
            }}
          >{label.title}</Switch>
        ))
      }
  </div>
  );

Labels.propTypes = {
  classes: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  labels: PropTypes.array.isRequired,
};

const LabelsCard = ({ labels, classes }) => (
  <Card shadow={1} className={classes.card}>
    <CardTitle>
      其它设置
    </CardTitle>
    <CardText className={classes.wrapper}>
      <Field name="status" component={Available} />
      <Field name="labels" component={Labels} props={{ labels, classes }} />
    </CardText>
  </Card>
);

LabelsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  labels: PropTypes.array.isRequired,
};

export default injectSheet({
  ...moduleStyles,
  wrapper: {
    '& label': {
      marginBottom: 16,
    },
  },
  labels: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    '& > label': {
      width: '50%',
    },
  },
})(LabelsCard);
