import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card';
import injectSheet from 'react-jss';
import moduleStyles from '../../moduleStyles';
import LocationField from '../../locationField';


const LocationCard = ({ title, classes }) => (
  <Card shadow={1} className={classes.card}>
    <CardTitle>
      { title || '发货地址' }
    </CardTitle>
    <CardText>
      <LocationField />
    </CardText>
  </Card>
);

LocationCard.propTypes = {
  title: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default injectSheet(moduleStyles)(LocationCard);
