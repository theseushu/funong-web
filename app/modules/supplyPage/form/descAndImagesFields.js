import React, { Component, PropTypes } from 'react';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import Button from 'modules/common/formElements/button';
import DescAndImagesDialog from 'modules/common/descAndImagesDialog';
import styles from 'modules/common/styles';
import RichContent from 'modules/common/richContent';

// '请详细描述您的产品。详尽的描述更能引起客户的关注哦'
class DescField extends Component {
  static propTypes = {
    desc: PropTypes.object.isRequired,
    images: PropTypes.object.isRequired,
    sheet: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = { showDialog: false };
  }
  render() {
    const { desc, images, sheet: { classes } } = this.props;
    const { showDialog } = this.state;
    const error = desc.meta.error || images.meta.error;
    const hasValue = desc.input.value || images.input.value;
    return (
      <Grid className={error && styles.colorError}>
        <Cell col={4} tablet={3} phone={2} className={classes.field}>
          描述
        </Cell>
        <Cell col={8} tablet={5} phone={2} className={classes.field}>
          {
            showDialog && (
              <DescAndImagesDialog
                textLabel="请详细描述您的产品。详尽的描述更能引起客户的关注哦"
                desc={desc.input.value}
                images={images.input.value}
                show={showDialog}
                close={() => this.setState({ showDialog: false })}
                onSubmit={(value) => {
                  desc.input.onChange(value.desc);
                  images.input.onChange(value.images);
                }}
              />
            )
          }
          <Button error={error} onClick={(e) => { e.preventDefault(); this.setState({ showDialog: true }); }}>{hasValue ? '修改' : '添加描述'}</Button>
        </Cell>
        <div className={classes.fieldContent}>
          <RichContent editing={false} richContent={{ desc: desc.input.value, images: images.input.value }} />
        </div>
      </Grid>
    );
  }
}

export default DescField;
