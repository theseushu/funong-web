import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card';
import injectSheet from 'react-jss';
import moduleStyles from '../../moduleStyles';
import RichTextField from '../../richTextField';


const RichTextCard = ({ classes }) => (
  <Card shadow={1} className={classes.card}>
    <CardTitle>
      详细描述
    </CardTitle>
    <CardText>
      <RichTextField />
    </CardText>
  </Card>
);

RichTextCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet(moduleStyles)(RichTextCard);
