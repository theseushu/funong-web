import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import Button from 'react-mdl/lib/Button';
import DescDialog from '../../common/descDialog';
import { colors, breakpoints } from '../../common/styles';
import RichContent from '../../common/richContent';

// '请详细描述您的产品。详尽的描述更能引起客户的关注哦'
class DescField extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    sheet: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = { showDialog: false };
  }
  render() {
    const { input: { value, onChange }, meta: { error }, sheet: { classes } } = this.props;
    const { showDialog } = this.state;
    return (
      <Grid>
        <Cell col={4} tablet={3} phone={2} className={classes.field}>
          描述
        </Cell>
        <Cell col={8} tablet={5} phone={2} className={classes.field} style={{ color: error ? colors.colorError : null }}>
          {
            showDialog && (
              <DescDialog
                textLabel="请详细描述您的产品。详尽的描述更能引起客户的关注哦"
                desc={value || {}} show={showDialog}
                close={() => this.setState({ showDialog: false })}
                onSubmit={onChange}
              />
            )
          }
          <Button colored onClick={() => this.setState({ showDialog: true })}>{value ? '修改' : '添加描述'}</Button>
        </Cell>
        <div className={classes.content}>
          <RichContent editing={false} richContent={value || { text: '', images: [] }} />
        </div>
      </Grid>
    );
  }
}

export default injectSheet({
  field: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    [breakpoints.mediaTabletAbove]: {
      margin: '0 16px',
    },
  },
})(DescField);
