import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card';
import styles from 'modules/common/styles';

const DescCard = ({ product: { desc }, className }) => (
  <Card shadow={2} className={`${styles.w100} ${className || ''}`}>
    <CardTitle>详细信息</CardTitle>
    <CardText>
      <div dangerouslySetInnerHTML={{ __html: desc }}></div>
    </CardText>
  </Card>
);

DescCard.propTypes = {
  product: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default DescCard;
