import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card';
import injectSheet from 'react-jss';
import moment from 'moment';
import { required } from '../../validations';
import moduleStyles from '../../moduleStyles';
import createDateField from '../../createDateField';

const today = moment().startOf('day');
const valid = (current) => current.isAfter(today);
const StartField = createDateField({
  name: 'startAt',
  title: '开始时间',
  validate: [required],
  processDate: (m) => m.set('minute', 0).set('second', 0),
  dateTimeProps: {
    input: false,
    locale: 'zh_CN',
    isValidDate: valid,
    timeFormat: 'HH:00',
  },
});
const EndField = createDateField({
  name: 'endAt',
  title: '结束时间',
  validate: [required],
  processDate: (m) => m.set('minute', 0).set('second', 0),
  dateTimeProps: {
    input: false,
    locale: 'zh_CN',
    isValidDate: valid,
    timeFormat: 'HH:00',
  },
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
