import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import _find from 'lodash/find';
import _remove from 'lodash/remove';
import Textfield from 'react-mdl/lib/Textfield';
import Checkbox from 'react-mdl/lib/Checkbox';
import { isPriceInvalid, isDistanceInvalid } from 'utils/validationUtils';
import { formatArea } from 'utils/displayUtils';
import { districtLevels } from 'appConstants';
import Dialog from '../dialog';
import Types from './components/types';
import Results from './components/results';
import CustomDistrict from './components/customDistrict';

const DEFAULT_DISTANCE = '5';

class areaEditorDialog extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    close: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    actions: PropTypes.shape({
      searchSubdistrict: PropTypes.func.isRequired,
    }).isRequired,
    searchDistrictState: PropTypes.shape({
      pending: PropTypes.bool,
      fulfilled: PropTypes.bool,
      rejected: PropTypes.bool,
      error: PropTypes.object,
      catalogs: PropTypes.array,
    }).isRequired,
    address: PropTypes.object.isRequired,
    area: PropTypes.object,
  };
  componentWillMount() {
    const { address: { district }, area } = this.props;
    if (area) {
      this.setState({
        level: area.level,
        districts: area.districts,
        distance: area.distance ? area.distance.toString() : null,
        minimum: area.minimum.toString(),
        deliveryFee: area.deliveryFee.toString(),
        editingDelivery: false,
      });
    } else {
      this.setState({ level: 'city', districts: [district], distance: null, minimum: '0', deliveryFee: '0', editingDelivery: false });
    }
  }
  componentDidMount() {
    this.search();
  }
  toggleSelection = ({ name }) => {
    const { districts } = this.state;
    const add = !_find(districts, (selection) => selection === name);
    if (add) {
      this.setState({ districts: [...this.state.districts, name] });
    } else {
      const newdistricts = [...districts];
      _remove(newdistricts, (selection) => selection === name);
      this.setState({ districts: newdistricts });
    }
  }
  customDistrict = (distance) => {
    this.setState({ distance });
  }
  changeLevel = (level) => {
    // changeLevel will clear selection, leave default one (the one in props.address) only
    const { address: { province, city, district } } = this.props;
    const districts = [];
    switch (level) {
      case districtLevels.country.value:
        districts.push(province);
        break;
      case districtLevels.province.value:
        districts.push(city);
        break;
      case districtLevels.city.value:
        districts.push(district);
        break;
      case districtLevels.district.value:
        break;
      default:
        break;
    }
    this.setState({ level, districts, distance: DEFAULT_DISTANCE }, () => {
      this.search();
    });
  }
  search = () => {
    const { address: { country, province, city, district } } = this.props;
    const { level } = this.state;
    let name;
    switch (level) {
      case 'country':
        name = country;
        break;
      case 'province':
        name = province;
        break;
      case 'city':
        name = city;
        break;
      case 'district':
        name = district;
        break;
      default:
    }
    if (name) {
      this.props.actions.searchSubdistrict({ level, name });
    }
  }
  render() {
    const { address, close, show, searchDistrictState, onSubmit, classes } = this.props;
    const { level, districts, distance, minimum, deliveryFee, editingDelivery } = this.state;
    const minimumError = isPriceInvalid(minimum);
    const deliveryFeeError = isPriceInvalid(deliveryFee);
    const distanceError = isDistanceInvalid(distance);
    if (editingDelivery) {
      return (
        <Dialog
          show={show}
          onHide={close}
          onCancel={() => {
            this.setState({ editingDelivery: false });
          }}
          title={'运费设置'}
          fixedContent={
            <div>
              <Textfield
                className={classes.input}
                floatingLabel
                label="起送金额"
                value={minimum}
                type="number"
                name="_area_minimum"
                onChange={(e) => this.setState({ minimum: e.target.value })}
                error={minimumError}
              />
              <Textfield
                className={classes.input}
                floatingLabel
                label="运费"
                value={deliveryFee}
                type="number"
                name="_area_delivery_fee"
                onChange={(e) => this.setState({ deliveryFee: e.target.value })}
                error={deliveryFeeError}
              />
              <div>
                <Checkbox
                  label="免运费" ripple
                  checked={deliveryFee.toString() === '0'}
                  onChange={(e) => {
                    if (e.target.value === 'on') {
                      this.setState({ deliveryFee: '0' });
                    }
                  }}
                />
              </div>
            </div>
          }
          scrollableContent={
            <div className={classes.districts}>
              选择的区域：{formatArea(address, { level, districts, distance })}
            </div>
          }
          submit={
            level === districtLevels.custom.value ? {
              onSubmit: (e) => {
                e.preventDefault();
                onSubmit({ level, distance: Number(distance), minimum: Number(minimum), deliveryFee: Number(deliveryFee) });
              },
              disabled: !!deliveryFeeError || !!minimumError || !!distanceError,
            } : {
              onSubmit: (e) => {
                e.preventDefault();
                onSubmit({ level, districts, minimum: Number(minimum), deliveryFee: Number(deliveryFee) });
              },
              disabled: !!deliveryFeeError || !!minimumError || districts.length === 0,
            }
          }
        />
      );
    }
    return (
      <Dialog
        show={show}
        onHide={close}
        onCancel={close}
        title={'服务区域'}
        fixedContent={<Types level={level} onButtonClick={this.changeLevel} />}
        scrollableContent={
          level === districtLevels.custom.value ? (
            <CustomDistrict value={distance} error={distanceError} onChange={this.customDistrict} />
          ) : (
            <Results
              {...searchDistrictState}
              onClick={this.toggleSelection}
              isButtonActive={({ name }) => !!_find(districts, (selection) => selection === name)}
            />
          )
        }
        submit={{
          onSubmit: (e) => {
            e.preventDefault();
            this.setState({ editingDelivery: true });
          },
          disabled: level === districtLevels.custom.value ? !!distanceError : districts.length === 0,
        }}
      />
    );
  }
}

export default injectSheet({
  input: {
    marginTop: 16,
  },
  districts: {
    margin: '24px 16px',
    '& > span': {
      fontSize: '80%',
      marginRight: 16,
    },
  },
})(areaEditorDialog);
