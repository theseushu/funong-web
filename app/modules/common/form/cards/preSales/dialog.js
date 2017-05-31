import React, { Component, PropTypes } from 'react';
import startOfTomorrow from 'date-fns/start_of_tomorrow';
import startOfToday from 'date-fns/start_of_today';
import addDays from 'date-fns/add_days';
import startOfDay from 'date-fns/start_of_day';
import endOfDay from 'date-fns/end_of_day';
import isBefore from 'date-fns/is_before';
import DatetimePicker from 'modules/common/datetimePicker';
import { zh } from 'flatpickr/src/l10n/zh';
import Dialog from 'modules/common/dialog/simpleDialog';

class DialogComponent extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    startAt: PropTypes.number,
    endAt: PropTypes.number,
  }
  state = { startAt: null, endAt: null }
  componentWillMount() {
    this.state = {
      startAt: this.props.startAt ? new Date(this.props.startAt) : startOfTomorrow(),
      endAt: this.props.endAt ? new Date(this.props.endAt) : endOfDay(addDays(startOfTomorrow(), 30)),
    };
  }
  render() {
    const { onSubmit, onClose } = this.props;
    const { startAt, endAt } = this.state;
    return (
      <Dialog
        show
        onHide={onClose}
        onCancel={onClose}
        submit={{
          onSubmit: () => onSubmit({ startAt: startAt.getTime(), endAt: endAt.getTime() }),
          disabled: !startAt || !endAt || isBefore(endAt, startAt),
        }}
        title="起止日期"
        content={
          <div style={{ display: 'flex' }}>
            <div>
              发售日期：
              <DatetimePicker
                value={startAt}
                options={{
                  locale: zh,
                  time_24hr: true,
                  enableTime: false,
                  dateFormat: 'Y-n-d',
                  disable: [(d) => isBefore(d, startOfToday())],
                }}
                onChange={(v) => {
                  const date = v[0];
                  this.setState({ startAt: startOfDay(date) });
                }}
              />
            </div>
            <div>
              截止日期：
              <DatetimePicker
                value={endAt}
                options={{
                  locale: zh,
                  time_24hr: true,
                  enableTime: false,
                  dateFormat: 'Y-n-d',
                  disable: [(d) => isBefore(d, startAt)],
                }}
                onChange={(v) => {
                  const date = v[0];
                  this.setState({ endAt: endOfDay(date) });
                }}
              />
            </div>
          </div>
        }
      />
    );
  }
}

export default DialogComponent;
