import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, change } from 'redux-form';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import injectSheet from 'react-jss';
import { actions } from 'modules/mapDialog/ducks';
import styles from 'modules/common/styles';
import Button from 'react-mdl/lib/Button';
import DateTimeDialog from 'modules/common/dateTimeDialog';

const today = moment().startOf('day');
const valid = (current) => current.isAfter(today);

class Date extends Component {
  static propTypes = {
    title: PropTypes.string,
    input: PropTypes.object.isRequired,
    meta: PropTypes.object,
    classes: PropTypes.object.isRequired,
  }
  state = { show: false }
  render() {
    const { title, input: { value, onChange }, meta: { error }, classes } = this.props;
    return (
      <div className={error && styles.colorError}>
        <div className={classes.date}>
          {title || '日期'}
          <Button
            colored
            onClick={(e) => {
              e.preventDefault();
              this.setState({ show: !this.state.show });
            }}
          >
            {this.state.show ? '取消' : moment(value).format('YYYY-MM-DD')}
          </Button>
        </div>
        <div className={classes.selector}>
          { this.state.show && <DateTimeDialog
            show
            title={title || '选择日期'}
            close={() => { this.setState({ show: false }); }}
            value={value}
            onSubmit={(m) => {
              m.set('hour', 23).set('minute', 59).set('second', 59);
              onChange(m.valueOf());
            }}
            submitOnChange
            props={{
              input: false,
              locale: 'zh_CN',
              isValidDate: valid,
              timeFormat: false,
            }}
          /> }
        </div>
      </div>
    );
  }
}

const DateField = connect(
  (dispatch, { form }) => bindActionCreators({ clearSpecies: () => change(form, 'species', '') }, dispatch),
  (dispatch) => bindActionCreators({ openDialog: actions.openDialog }, dispatch)
)(injectSheet({
  date: {
  },
  selector: {
    position: 'relative',
    marginBottom: 16,
    '& > div': {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1000,
    },
  },
})(Date));

export default ({ name, ...props }) => () => <Field name={name} component={DateField} props={{ ...props }} />;
