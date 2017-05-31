import React, { Component, PropTypes } from 'react';
import { Fields } from 'redux-form';
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card';
import Switch from 'react-mdl/lib/Switch';
import Button from 'react-mdl/lib/Button';
import injectSheet from 'react-jss';
import { formatTime } from 'funong-common/lib/utils/displayUtils';
import Dialog from './dialog';
import moduleStyles from '../../moduleStyles';

class PreSales extends Component {
  state = { showDialog: false }
  render() {
    const { startAt, endAt } = this.props;
    const isPre = !!(startAt.input.value && endAt.input.value);
    return (
      <div>
        <Switch
          ripple
          checked={isPre}
          onChange={(e) => {
            if (e.target.checked) {
              this.setState({ showDialog: true });
            } else {
              startAt.input.onChange(null);
              endAt.input.onChange(null);
            }
          }}
        ></Switch>
        {
          isPre && (
            <Button
              colored
              onClick={(e) => {
                e.preventDefault();
                this.setState({ showDialog: true });
              }}
            >{`${formatTime(startAt.input.value)} —— ${formatTime(endAt.input.value)}`}
            </Button>
          )
        }
        {
          this.state.showDialog && (
            <Dialog
              startAt={startAt.input.value || null}
              endAt={endAt.input.value || null}
              onClose={() => this.setState({ showDialog: false })}
              onSubmit={(value) => {
                this.setState({ showDialog: false });
                startAt.input.onChange(value.startAt);
                endAt.input.onChange(value.endAt);
              }}
            />
          )
        }
      </div>
    );
  }
}

PreSales.propTypes = {
  startAt: PropTypes.object.isRequired,
  endAt: PropTypes.object.isRequired,
};

const PreSalesCard = ({ classes }) => (
  <Card shadow={1} className={classes.card}>
    <CardTitle>
      预售
    </CardTitle>
    <CardText className={classes.wrapper}>
      <Fields names={['startAt', 'endAt']} component={PreSales} />
    </CardText>
  </Card>
);

PreSalesCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  ...moduleStyles,
  wrapper: {
    '& label': {
      marginBottom: 16,
    },
  },
})(PreSalesCard);
