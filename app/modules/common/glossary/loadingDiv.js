import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import styles from 'modules/common/styles';
import Loading from './loading';

const LoadingDiv = ({ pending, children, classes, className, style }) => {
  if (!pending && !children) {
    return null;
  }
  return (
    <div className={className ? `${classes.loadingDiv} ${className}` : classes.loadingDiv} style={style}>
      {children || <Loading />}
      {pending && ( // eslint-disable-next-line
        <div
          className={`${classes.loading} ${styles.contentCenter}`}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
        >
          <Loading />
        </div>
      )}
    </div>
  );
};

LoadingDiv.propTypes = {
  pending: PropTypes.bool,
  children: PropTypes.any,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default injectSheet({
  loadingDiv: {
    position: 'relative',
  },
  loading: {
    position: 'absolute',
    background: 'rgba(0,0,0, 0.1)',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
})(LoadingDiv);
