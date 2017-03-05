import React, { PropTypes } from 'react';
import styles from 'modules/common/styles';
import Header from './header';
import Desc from './desc';
import Comments from './comments';

const Supply = ({ product, location }) => (
  <div>
    <Header product={product} location={location} />
    <Desc product={product} className={styles.mt24} />
    <Comments supplyProduct={product} className={styles.mt24} />
  </div>
);

Supply.propTypes = {
  product: PropTypes.object.isRequired,
  location: PropTypes.object,
};

export default Supply;
