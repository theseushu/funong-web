import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Button from 'react-bootstrap/lib/Button';
import RaisingButton from '../raisingButton';
import Dialog from '../dialog';

import { availablePeriods, displayPeriod } from '../../../utils/momentUtils';

const styles = {
  monthLine: {
    display: 'flex',
  },
  monthLineLabel: {
    width: 50,
    lineHeight: '34px',
  },
  monthLineButtons: {
    flex: 1,
    textAlign: 'center',
    '& > div': {
      display: 'inline-block',
      width: '33.3%',
    },
  },
  monthLineButton: {
    width: 100,
    maxWidth: '100%',
  },
};

const periods = availablePeriods();

class PickDatesDialog extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    sheet: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    value: PropTypes.object,
  };
  constructor(props) {
    super(props);
    const value = props.value || {};
    this.state = { start: value.start || null, end: value.end || null, selectStart: true };
  }
  onPeriodSelected = ({ start, end }) => {
    if (this.state.selectStart) {
      this.setState({ start, selectStart: false });
      if (typeof this.state.end === 'number' && start > this.state.end) {
        this.setState({ end: null });
      }
      return;
    } else if (this.state.start < end) {
      this.setState({ end }, () => {
        this.submit();
      });
      return;
    }
    console.error(`Wrong status! start (${this.state.start}), end to be set (${end})`); // eslint-disable-line no-console
    // TODO it should not happen. maybe report an error to cloud
  }
  submit = () => {
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit({ start: this.state.start, end: this.state.end });
    }
    this.props.close();
  }
  renderMonthLine = (month, i) => {
    const { start, end, selectStart } = this.state;
    const { name, first, second, third } = month;
    const { sheet: { classes } } = this.props;
    return (
      <div key={i} className={classes.monthLine}>
        <div className={classes.monthLineLabel}><strong>{name}</strong></div>
        <div className={classes.monthLineButtons}>
          {
            [first, second, third].map((period, j) => {
              const isStart = (typeof period === 'object') && (period.start === start);
              const isEnd = (typeof period === 'object') && (period.end === end);
              let bsStyle = 'default';
              if (isStart) {
                bsStyle = isEnd ? 'warning' : 'primary';
              } else if (isEnd) {
                bsStyle = 'info';
              }
              return (
                <div key={j}>
                  <Button
                    className={`${classes.monthLineButton} ${period ? '' : ' invisible'}`}
                    bsStyle={bsStyle}
                    onClick={() => this.onPeriodSelected(period)}
                    disabled={!selectStart && typeof period === 'object' && period.start < start}
                  >{period && period.name}</Button>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
  renderYearBlock = (year, months) => (
    <div key={year}>
      <div><small>{year}年</small></div>
      { Object.values(months).map((month, i) => (this.renderMonthLine(month, i)))}
    </div>
    )
  render() {
    const { close } = this.props;
    const { start, end, selectStart } = this.state;
    return (
      <Dialog
        show
        submitDisabled={start === null || end === null}
        onHide={close}
        onCancel={close}
        title={'选择供货时间'}
        fixedContent={
          <div>
            <RaisingButton label="开始时间" shadow={3} active={selectStart} onClick={() => this.setState({ selectStart: true })} />
            <RaisingButton label="结束时间" shadow={3} active={!selectStart} onClick={() => this.setState({ selectStart: false })} />
            <p style={{ paddingLeft: '2em' }}><small>{displayPeriod(start, end) || '请选择起止日期'}</small></p>
          </div>
        }
        scrollableContent={
          <div>
            { Object.keys(periods).map((key) => this.renderYearBlock(key, periods[key])) }
          </div>
        }
      />
    );
  }
}


export default injectSheet(styles)(PickDatesDialog);
