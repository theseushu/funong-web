import React, { PropTypes } from 'react';
import { Fields } from 'redux-form';
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card';
import injectSheet from 'react-jss';
import moduleStyles from '../moduleStyles';
import NameField from './nameField';
import RangeField from './rangeField';

const RangeNameFields = ({ range, name }) => (
  <div>
    <NameField {...name} />
    <RangeField {...range} />
  </div>
);

RangeNameFields.propTypes = {
  range: PropTypes.object.isRequired,
  name: PropTypes.object.isRequired,
};

const RangeNameCard = ({ classes }) => (
  <Card shadow={1} className={classes.card}>
    <CardTitle>
      名称，服务区域
    </CardTitle>
    <CardText>
      <Fields names={['range', 'name']} component={RangeNameFields} />
    </CardText>
  </Card>
);

RangeNameCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet(moduleStyles)(RangeNameCard);

