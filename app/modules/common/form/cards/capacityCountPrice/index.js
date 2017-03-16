import React, { PropTypes } from 'react';
import { Fields } from 'redux-form';
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card';
import injectSheet from 'react-jss';
import moduleStyles from '../../moduleStyles';
import CapacityField from './capacityField';
import CountField from './countField';
import PriceField from './priceField';

const CapacityCountPrice = ({ capacity, count, price }) => (
  <div>
    <CapacityField {...capacity} />
    <CountField {...count} />
    <PriceField {...price} />
  </div>
  );

CapacityCountPrice.propTypes = {
  capacity: PropTypes.object.isRequired,
  count: PropTypes.object.isRequired,
  price: PropTypes.object.isRequired,
};

const CapacityCountNameFields = ({ classes }) => (
  <Card shadow={1} className={classes.card}>
    <CardTitle>
      运输量，车辆数，定价
    </CardTitle>
    <CardText>
      <Fields names={['capacity', 'count', 'price']} component={CapacityCountPrice} />
    </CardText>
  </Card>
);

CapacityCountNameFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet(moduleStyles)(CapacityCountNameFields);
