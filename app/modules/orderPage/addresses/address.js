import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Button from 'react-mdl/lib/Button';
import { Card, CardText, CardActions } from 'react-mdl/lib/Card';
import styles, { colors } from 'modules/common/styles';

const Address = ({ address, openDialog, setDefaultAddress, updateAddress, active, onClick, className, classes }) => (
  <Card
    shadow={0}
    className={`${classes.card} ${styles.defaultTransition} ${active ? classes.active : ''} ${className}`}
    onClick={() => {
      if (onClick != null) {
        onClick();
      }
    }}
  >
    <CardText className={classes.cardText}>
      <p className={classes.details}>
        {address.address.details}
        <span className={classes.contact}> {address.contact}(收) {address.phone}</span>
      </p>
    </CardText>
    <CardActions>
      <Button
        disabled={address.default}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDefaultAddress();
        }}
      >{address.default ? '默认地址' : '设为默认'}</Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          openDialog({
            onSubmit: (addr) => (updateAddress({ ...addr, default: address.default })),
            postAddress: true,
            location: address,
          });
        }}
      >修改</Button>
    </CardActions>
  </Card>
  );

Address.propTypes = {
  className: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  address: PropTypes.object.isRequired,
  openDialog: PropTypes.func.isRequired,
  updateAddress: PropTypes.func.isRequired,
  setDefaultAddress: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default injectSheet({
  card: {
    minHeight: 0,
    minWidth: 0,
    '&:hover': {
      boxShadow: 'rgba(0, 0, 0, 0.247059) 0px 14px 45px, rgba(0, 0, 0, 0.219608) 0px 10px 18px !important',
    },
    display: 'flex',
    flexDirection: 'column',
  },
  active: {
    border: `solid 1px ${colors.colorAccent}`,
    background: colors.colorLightAccent,
  },
  cardText: {
    width: '100%',
    paddingBottom: 0,
    flex: 1,
  },
  details: {
    margin: 0,
  },
  contact: {
  },
})(Address);
