import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card';
import injectSheet from 'react-jss';
import isBefore from 'date-fns/is_before';
import endOfDay from 'date-fns/end_of_day';
import { required } from '../../validations';
import createTextfield from '../../utils/createText';
import moduleStyles from '../../moduleStyles';
import RangeField from '../../rangeField';
import createDateField from '../../createDateField';

const today = endOfDay(new Date());
const valid = (current) => isBefore(current, today);

const PriceField = createTextfield({ name: 'price', label: '期望价格', validate: [required] });
const DateField = createDateField({
  name: 'endAt',
  title: '截止日期',
  validate: [required],
  enableTime: false,
  isValidDate: valid,
  processDate: (v) => endOfDay(v).getTime(),
});
const QuantityField = createTextfield({ name: 'quantity', label: '采购量', validate: [required] });

// zIndex is set to 2, bigger than Card's default 1. because DateField needs it
const RangePriceEndAtCard = ({ title, rangeTitle, rangeDialogTitle, classes }) => (
  <Card shadow={1} className={classes.card} style={{ zIndex: 2 }}>
    <CardTitle>
      {title || '货源地，收货地'}
    </CardTitle>
    <CardText>
      <DateField />
      <RangeField title={rangeTitle} dialogTitle={rangeDialogTitle} />
      <PriceField />
      <QuantityField />
    </CardText>
  </Card>
);

RangePriceEndAtCard.propTypes = {
  title: PropTypes.string,
  rangeTitle: PropTypes.string,
  rangeDialogTitle: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default injectSheet(moduleStyles)(RangePriceEndAtCard);
