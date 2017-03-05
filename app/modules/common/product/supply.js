import React, { PropTypes } from 'react';
import styles from 'modules/common/styles';
import { MainRight } from 'modules/common/layout/content';
import UserCard from 'modules/common/user/card';
import { Supply as SupplyHeader } from './header';
import Desc from './desc';
import Comments from './comments';

const Supply = ({ product, location }) => (
  <div>
    <SupplyHeader product={product} location={location} />
    <MainRight
      main={[
        <Desc key={0} product={product} />,
        <Comments key={1} supplyProduct={product} className={styles.mt24} />,
      ]}
      right={<UserCard user={product.owner} />}
    />
  </div>
);

Supply.propTypes = {
  product: PropTypes.object.isRequired,
  location: PropTypes.object,
};

export default Supply;
