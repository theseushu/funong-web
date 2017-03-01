import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card';
import styles, { colors } from 'modules/common/styles';
import Form from './form';
import List from './list';

const CommentsCard = ({ shopProduct, supplyProduct, logisticsProduct, className, classes }) => (
  <Card shadow={2} className={`${styles.w100} ${className || ''}`}>
    <CardTitle>评论</CardTitle>
    <CardText>
      <List target={{ shopProduct, supplyProduct, logisticsProduct }} />
    </CardText>
    <CardText className={classes.form}>
      <h6>新评论</h6>
      <Form target={{ shopProduct, supplyProduct, logisticsProduct }} />
    </CardText>
  </Card>
);

CommentsCard.propTypes = {
  shopProduct: PropTypes.object,
  supplyProduct: PropTypes.object,
  logisticsProduct: PropTypes.object,
  className: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  form: {
    borderTop: `solid 1px ${colors.colorLightGrey}`,
    '& > h6': {
      margin: 0,
    },
  },
})(CommentsCard);
