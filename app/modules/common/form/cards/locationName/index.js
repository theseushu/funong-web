import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card';
import injectSheet from 'react-jss';
import moduleStyles from '../../moduleStyles';
import NameField from '../../nameField';
import LocationField from '../../locationField';


const LocationNameCard = ({ title, classes }) => (
  <Card shadow={1} className={classes.card}>
    <CardTitle>
      { title || '名称和地址' }
    </CardTitle>
    <CardText>
      <NameField />
      <LocationField />
    </CardText>
  </Card>
);

LocationNameCard.propTypes = {
  title: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default injectSheet(moduleStyles)(LocationNameCard);
