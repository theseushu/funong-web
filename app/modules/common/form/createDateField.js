import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import 'flatpickr/dist/themes/material_blue.css';
import DatetimePicker from 'modules/common/datetimePicker';
import { zh } from 'flatpickr/src/l10n/zh';
import injectSheet from 'react-jss';
import styles, { colors } from 'modules/common/styles';

const DateComponent = ({ title, enableTime = true, processDate, isValidDate, input: { value, onChange }, meta: { error }, classes }) => (
  <div className={`${classes.wrapper} ${error ? styles.colorError : ''}`}>
    <span>{title}：</span>
    <DatetimePicker
      value={new Date(value)}
      options={{
        locale: zh,
        time_24hr: true,
        enableTime,
        dateFormat: enableTime ? 'Y-n-d H:i' : 'Y-n-d',
        disable: isValidDate ? [isValidDate] : undefined,
      }}
      onChange={(v) => {
        const date = v[0];
        if (processDate) {
          onChange(processDate(date));
        } else {
          onChange(date.getTime());
        }
      }}
    />
  </div>
  );

DateComponent.propTypes = {
  title: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
  classes: PropTypes.object.isRequired,
  processDate: PropTypes.func,
  isValidDate: PropTypes.func,
  enableTime: PropTypes.bool,
};

const DateField = injectSheet({
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    '& input': {
      outline: 'none',
      border: `solid 1px ${colors.colorLightGrey}`,
      fontSize: '1em',
      lineHeight: '18px',
      margin: '7px 0',
    },
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
})(DateComponent);

export default ({ name, ...props }) => () => <Field name={name} component={DateField} props={{ ...props }} />;
