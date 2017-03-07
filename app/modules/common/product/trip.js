import React, { PropTypes } from 'react';
import styles from 'modules/common/styles';
import { MainRight } from 'modules/common/layout/content';
import UserCard from 'modules/common/user/card';
import { Trip as TripHeader } from './header';
import Desc from './desc';
import Comments from './comments';

const Trip = ({ product, location }) => (
  <div>
    <TripHeader product={product} location={location} />
    <MainRight
      main={[
        <Desc key={0} product={product} />,
        <Comments key={1} supplyProduct={product} className={styles.mt24} />,
      ]}
      right={<UserCard user={product.owner} />}
    />
    <Desc product={product} className={styles.mt24} />
    <Comments supplyProduct={product} className={styles.mt24} />
  </div>
);

Trip.propTypes = {
  product: PropTypes.object.isRequired,
  location: PropTypes.object,
};

export default Trip;
