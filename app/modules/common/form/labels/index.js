import React, { PropTypes } from 'react';
import _without from 'lodash/without';
import { Field } from 'redux-form';
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card';
import Switch from 'react-mdl/lib/Switch';
import injectSheet from 'react-jss';
import moduleStyles from '../moduleStyles';

const Labels = ({ classes, labels, input: { value, onChange } }) => {
  return (
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
}

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
    <CardText>
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
  labels: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    '& > label': {
      width: '50%',
    },
  },
})(LabelsCard);
