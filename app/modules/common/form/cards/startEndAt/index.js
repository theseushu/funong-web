import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card';
import injectSheet from 'react-jss';
import isBefore from 'date-fns/is_before';
import endOfDay from 'date-fns/end_of_day';
import { required } from '../../validations';
import moduleStyles from '../../moduleStyles';
import createDateField from '../../createDateField';

const today = endOfDay(new Date());
const valid = (current) => isBefore(current, today);

const StartField = createDateField({
  name: 'startAt',
  title: '开始时间',
  validate: [required],
  enableTime: true,
  isValidDate: valid,
});
const EndField = createDateField({
  name: 'endAt',
  title: '结束时间',
  validate: [required],
  enableTime: true,
  isValidDate: valid,
});

const StartEndAt = ({ classes }) => (
  <Card shadow={1} className={classes.card}>
    <CardTitle>
      开始和结束时间
    </CardTitle>
    <CardText>
      <StartField />
      <EndField />
    </CardText>
  </Card>
);

StartEndAt.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet(moduleStyles)(StartEndAt);
