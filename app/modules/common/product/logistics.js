import React, { PropTypes } from 'react';
import styles from 'modules/common/styles';
import { Logistics as LogisticsHeader } from './header';
import Desc from './desc';
import Comments from './comments';

const Logistics = ({ product, location }) => (
  <div>
    <LogisticsHeader product={product} location={location} />
    <Desc product={product} className={styles.mt24} />
    <Comments supplyProduct={product} className={styles.mt24} />
  </div>
);

Logistics.propTypes = {
  product: PropTypes.object.isRequired,
  location: PropTypes.object,
};

export default Logistics;
