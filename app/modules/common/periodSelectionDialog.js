import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import RaisingButton from './raisingButton';

import { availablePeriods, displayPeriod } from '../../utils/momentUtils';

const styles = {
  dialog: {
    width: 500,
    maxWidth: '100%',
    margin: '0 auto 0 auto',
  },
  monthLine: {
    display: 'flex',
    marginTop: 5,
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
    } else if (this.state.start < end) {
      this.setState({ end });
    } else {
      console.error(`Wrong status! start (${this.state.start}), end to be set (${end})`);
    }
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
      <h4><small>{year}年</small></h4>
      { Object.values(months).map((month, i) => (this.renderMonthLine(month, i)))}
    </div>
    )
  render() {
    const { close, sheet: { classes } } = this.props;
    const { start, end, selectStart } = this.state;
    return (
      <Modal show onHide={close}>
        <Modal.Header>
          <Modal.Title className={classes.dialog}>选择供货时间</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <RaisingButton label="开始时间" shadow={3} active={selectStart} onClick={() => this.setState({ selectStart: true })} />
            <RaisingButton label="结束时间" shadow={3} active={!selectStart} onClick={() => this.setState({ selectStart: false })} />
          </div>
          <h4 className="text-center"><small>{displayPeriod(start, end)}</small></h4>
          <div className={classes.dialog}>
            { Object.keys(periods).map((key) => this.renderYearBlock(key, periods[key])) }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close}>取消</Button>
          <Button disabled={start === null || end === null} onClick={this.submit}>确定</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


export default injectSheet(styles)(PickDatesDialog);
