import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field } from 'redux-form';
import injectSheet from 'react-jss';
import { formatProvinces } from 'utils/displayUtils';
import { actions } from 'modules/mapDialog/ducks';
import styles, { colors } from 'modules/common/styles';
import ProvincesSelectorDialog from 'modules/common/location/provincesSelectorDialog';
import FormButton from 'modules/common/formElements/button';

class Range extends Component {
  static propTypes = {
    title: PropTypes.string,
    dialogTitle: PropTypes.string,
    input: PropTypes.object.isRequired,
    meta: PropTypes.object,
    classes: PropTypes.object.isRequired,
  }
  state = {
    showDialog: false,
  }
  render() {
    const { dialogTitle, title, input: { value, onChange }, meta: { error }, classes } = this.props;
    const { showDialog } = this.state;
    return (
      <div className={error && styles.colorError}>
        <div>
          {title || '服务区域'}
          <FormButton
            error={error} onClick={(e) => {
              e.preventDefault();
              this.setState({ showDialog: true });
            }}
          >
            修改
          </FormButton>
        </div>
        <div className={`${classes.range}`}>
          {formatProvinces(value)}
        </div>
        <ProvincesSelectorDialog
          title={dialogTitle}
          show={showDialog}
          close={() => this.setState({ showDialog: false })}
          onSubmit={(range) => { onChange(range); this.setState({ showDialog: false }); }}
          provinces={value}
        />
      </div>
    );
  }
}

const RangeField = connect(
  null,
  (dispatch) => bindActionCreators({ openDialog: actions.openDialog }, dispatch)
)(injectSheet({
  range: {
    marginBottom: 16,
    '& > span': {
      fontSize: 12,
      padding: 8,
      color: colors.colorSubTitle,
      display: 'inline-block',
    },
  },
})(Range));

export default ({ ...props }) => <Field name="range" component={RangeField} props={{ ...props }} />;
