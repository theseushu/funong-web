import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Checkbox from 'react-mdl/lib/Checkbox';
import styles from 'modules/common/styles';

class Serivces extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    services: PropTypes.array.isRequired,
    onServiceChange: PropTypes.func,
  }
  state = { editing: false }
  render() {
    const { services, onServiceChange, classes } = this.props;
    // there's no available service to chose
    if (services.length === 0) {
      return null;
    }
    return (
      onServiceChange == null ? (
        <div className="_left">
          <small className={styles.w100}>选择的服务</small>
          <div className={classes.checkboxes}>
            { services.filter(({ checked }) => checked).map(({ title, value, charge, checked }, i) => (
              <div key={i}>
                { title }
                { charge && <small className={styles.colorSubPrice}>(单独收费)</small>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="_left">
          <small className={styles.w100}>卖家提供以下服务</small>
          <div className={classes.checkboxes}>
            { services.map(({ title, value, charge, checked }, i) => (
              <div key={i}>
                <Checkbox
                  label={title}
                  checked={checked}
                  onChange={(e) => onServiceChange(e.target.checked, value, charge)}
                />
                { charge && <small className={styles.colorSubPrice}>(单独收费)</small>}
              </div>
            ))
            }
          </div>
        </div>
      )
    );
  }
}


export default injectSheet({
  checkboxes: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      marginRight: 16,
      '& > .mdl-checkbox': {
        width: 'auto',
      },
    },
  },
})(Serivces);
