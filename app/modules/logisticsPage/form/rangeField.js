import React, { Component, PropTypes } from 'react';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import ProvincesSelectorDialog from 'modules/common/provincesSelectorDialog';
import FormButton from 'modules/common/formElements/button';
import styles from 'modules/common/styles';

class LocationField extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object,
    sheet: PropTypes.object.isRequired,
  }
  state = {
    showDialog: false,
  }
  render() {
    const { input: { value, onChange }, meta: { error }, sheet: { classes } } = this.props;
    const { showDialog } = this.state;
    return (
      <Grid className={error && styles.colorError}>
        <Cell col={4} tablet={3} phone={2} className={classes.field}>
          服务区域
        </Cell>
        <Cell col={8} tablet={5} phone={2} className={classes.field}>
          <FormButton
            error={error} onClick={(e) => {
              e.preventDefault();
              this.setState({ showDialog: true });
            }}
          >
            {value.length === 0 ? '点击选择' : '修改'}
          </FormButton>
          <ProvincesSelectorDialog
            show={showDialog}
            close={() => this.setState({ showDialog: false })}
            onSubmit={(range) => { onChange(range); this.setState({ showDialog: false }); }}
            provinces={value}
          />
        </Cell>
        <div className={`${classes.fieldContent} ${classes.range}`}>
          {
            value.map((province, i) => <span key={i}>{province.title}</span>)
          }
        </div>
      </Grid>
    );
  }
}

export default LocationField;
