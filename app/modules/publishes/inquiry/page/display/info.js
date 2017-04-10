import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { formatProvinces, formatAddress, formatTime } from 'utils/displayUtils';
import styles from 'modules/common/styles';
import { Label as CategoryLabel } from 'modules/common/categories';
import { Label as SpeciesLabel } from 'modules/common/species';

const Info = ({ inquiry, classes }) => (
  <div>
    <div className={classes.line}>
      <p>
          分类：
          <span className={classes.labels}>
            <CategoryLabel category={inquiry.category} />
            <SpeciesLabel species={inquiry.species} />
          </span>
      </p>
    </div>
    <div className={classes.line}>
      <p>
          期望价格：
          <span className={styles.colorPrice}>
            {inquiry.price}
          </span>
      </p>
      <p>
          采购量：
          <span className={styles.colorPrice}>
            {inquiry.quantity}
          </span>
      </p>
    </div>
    <div className={classes.line}>
      <p>
          货源地：
          <span className={styles.colorPrice}>
            {formatProvinces(inquiry.range)}
          </span>
      </p>
      <p>
          截止日期：
          <span className={styles.colorPrice}>
            {formatTime(inquiry.endAt)}
          </span>
      </p>
    </div>
    <div className={classes.line}>
      <p>
          收货地：
          <span>
            {formatAddress(inquiry.location.address)}
          </span>
      </p>
    </div>
  </div>
  );

Info.propTypes = {
  inquiry: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  labels: {
    '& > span': {
      marginLeft: 16,
    },
  },
  line: {
    display: 'flex',
    '& > p': {
      flex: 1,
    },
  },
})(Info);
