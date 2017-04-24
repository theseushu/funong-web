import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import IconButton from 'react-mdl/lib/IconButton';
import styles, { colors, shadows } from 'modules/common/styles';
import { formatDeliveryFee, formatArea } from 'funong-common/lib/utils/displayUtils';
import { districtLevels } from 'funong-common/lib/appConstants';
import AreaEditorDialog from './areaEditorDialog';

class Areas extends Component {
  static propTypes = {
    areas: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    adding: PropTypes.bool.isRequired,
    onAddingFinish: PropTypes.func.isRequired,
    location: PropTypes.object,
  }
  constructor({ areas, adding }) {
    super();
    this.state = { editing: adding ? areas.length : null };
  }
  componentWillReceiveProps({ areas, adding }) {
    if (adding) {
      this.setState({ editing: areas.length });
    }
  }
  render() {
    const { areas, classes, location, onChange, adding, onAddingFinish } = this.props;
    const { editing } = this.state;
    return (
      <div className={classes.areas}>
        {areas.map(({ level, minimum, distance, deliveryFee, districts }, i) => (
          <div key={i} className={`${classes.item} ${shadows.shadow2}`}>
            <div className={classes.districts}>
              <small>{formatArea(location.address, { level, distance, districts })}</small>
            </div>
            <div className={classes.delivery}>
              <span className={styles.colorPrice}>{formatDeliveryFee(minimum, deliveryFee)}</span>
              <span>
                <IconButton
                  name="edit" colored
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ editing: i });
                  }}
                />
                <IconButton
                  name="delete" colored
                  onClick={(e) => {
                    e.preventDefault();
                    const newAreas = [...areas];
                    newAreas.splice(i, 1);
                    onChange(newAreas);
                  }}
                />
              </span>
            </div>
          </div>
        ))}
        {editing !== null && (
          <AreaEditorDialog
            area={areas[editing]}
            address={location.address}
            close={() => {
              if (adding) {
                onAddingFinish();
              }
              this.setState({ editing: null });
            }}
            show
            onSubmit={({ level, distance, districts, minimum, deliveryFee }) => {
              const newAreas = [...areas];
              if (level === districtLevels.custom.value) {
                newAreas[editing] = { level, distance, minimum, deliveryFee };
              } else {
                newAreas[editing] = { level, districts, minimum, deliveryFee };
              }
              onAddingFinish();
              onChange(newAreas);
              this.setState({ editing: null });
            }}
          />
        )}
      </div>
    );
  }
}

export default injectSheet({
  list: {
    width: '100%',
  },
  item: {
    padding: 8,
    margin: 8,
  },
  districts: {
    color: colors.colorSubTitle,
  },
  delivery: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})(Areas);
