import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectSheet from 'react-jss';
import Button from 'react-mdl/lib/Button';
import { actions } from 'modules/mapDialog/ducks';
import { myShopSelector } from 'modules/data/ducks/selectors';
import { publishTypes } from 'funong-common/lib/appConstants';
import { SimpleDialog } from 'modules/common/dialog';
import PublishSelector from 'modules/publishSelector';
import * as Cards from 'modules/common/publishes/cards';

const type = publishTypes.product;
const Card = Cards[type].briefCard;

class OriginalSelector extends Component {
  static propTypes = {
    title: PropTypes.string,
    shop: PropTypes.object.isRequired,
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    readOnly: PropTypes.bool,
  }
  state = { showDialog: false }
  componentWillMount() {
    const { value } = this.props;
    if (!value) {
      this.setState({ showDialog: true });
    }
  }
  render() {
    const { readOnly, title = '选择商品', shop, value, onChange, classes } = this.props;
    const { showDialog } = this.state;
    return (
      <div className={classes.original}>
        {!readOnly && (<div>
          <Button
            colored
            onClick={(e) => {
              e.preventDefault();
              this.setState({ showDialog: true });
            }}
          >
            {value ? '更换其它商品' : title}
          </Button>
        </div>)}
        {
          value && (
            <Card publish={value} />
          )
        }
        {
          showDialog && (
            <SimpleDialog
              title={title}
              show={showDialog}
              onHide={() => this.setState({ showDialog: false })}
              onCancel={() => this.setState({ showDialog: false })}
              content={
                <PublishSelector
                  type={type}
                  query={{ shop }}
                  selected={value ? [value] : []}
                  onSelect={(selected) => {
                    onChange(selected[0]);
                    this.setState({ showDialog: false });
                  }}
                />
              }
              submit={{
                onSubmit: () => {
                  this.setState({ showDialog: false });
                },
                disabled: !value,
              }}
            />
          )
        }
      </div>
    );
  }
}

export default connect(
  (state) => ({ shop: myShopSelector(state) }),
  (dispatch) => bindActionCreators({ openDialog: actions.openDialog }, dispatch)
)(injectSheet({
  original: {
    marginBottom: 24,
  },
})(OriginalSelector));
