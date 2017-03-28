import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card';
import injectSheet from 'react-jss';
import moduleStyles from '../../moduleStyles';
import LocationField from '../../locationField';


const LocationCard = ({ locationTitle, locationDialogTitle, title, classes }) => (
  <Card shadow={1} className={classes.card}>
    <CardTitle>
      { title || '发货地址' }
    </CardTitle>
    <CardText>
      <LocationField title={locationTitle} dialogTitle={locationDialogTitle} />
    </CardText>
  </Card>
);

LocationCard.propTypes = {
  title: PropTypes.string,
  classes: PropTypes.object.isRequired,
  locationTitle: PropTypes.string,
  locationDialogTitle: PropTypes.string,
};

export default injectSheet(moduleStyles)(LocationCard);
