import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Button from 'react-mdl/lib/Button';
import Textfield from 'react-mdl/lib/Textfield';
import CategoryLabel from '../../common/category/label';
import { colors } from '../../common/styles';

class Subscriptions extends Component {
  constructor(props) {
    super(props);
    this.state = { nameEditing: false, activeTab: 0 };
  }
  render() {
    const { sheet: { classes } } = this.props;
    return (
      <div>
        <div>
          <h6 style={{ color: colors.colorSubTitle }}>推荐</h6>
          <div className={classes.chips}>
            <CategoryLabel>白菜</CategoryLabel>
            <CategoryLabel>土豆</CategoryLabel>
            <CategoryLabel>苹果</CategoryLabel>
          </div>
        </div>
        <div>
          <h6 style={{ color: colors.colorSubTitle }}>供应</h6>
          <div className={classes.chips}>
            <CategoryLabel onClose={() => {}}>白菜</CategoryLabel>
            <CategoryLabel onClose={() => {}}>土豆</CategoryLabel>
            <CategoryLabel onClose={() => {}}>苹果</CategoryLabel>
            <span>
              <div style={{ display: 'inline-block', position: 'relative', width: 210 }}>
                <Textfield id="_add_supply_subscription" style={{ position: 'absolute', left: 0, top: -32 }} label="添加" expandable expandableIcon="add"></Textfield>
              </div>
            </span>
          </div>
        </div>
        <div>
          <h6 style={{ color: colors.colorSubTitle }}>采购</h6>
          <div className={classes.chips}>
            <CategoryLabel onClose={() => {}}>白菜</CategoryLabel>
            <CategoryLabel onClose={() => {}}>土豆</CategoryLabel>
            <CategoryLabel onClose={() => {}}>苹果</CategoryLabel>
            <span>
              <div style={{ display: 'inline-block', position: 'relative', width: 210 }}>
                <Textfield id="_add_purchase_subscription" style={{ position: 'absolute', left: 0, top: -32 }} label="添加" expandable expandableIcon="add"></Textfield>
              </div>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

Subscriptions.propTypes = {
  sheet: PropTypes.object.isRequired,
};

export default injectSheet({
  chips: {
    '& > span': {
      marginRight: 8,
    },
  },
})(Subscriptions);
