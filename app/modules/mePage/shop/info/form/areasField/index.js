import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import IconButton from 'react-mdl/lib/IconButton';
import Tooltip from 'react-mdl/lib/Tooltip';
import { colors } from 'modules/common/styles';
import FORM_NAME from '../formName';
import Areas from './areas';

class AreasField extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    sheet: PropTypes.object.isRequired,
    location: PropTypes.object,
  }
  state = { adding: false }
  render() {
    const { sheet: { classes }, input: { value, onChange }, location, meta: { error } } = this.props;
    const { adding } = this.state;
    return (
      <div className={classes.field}>
        <div className={classes.title} style={{ color: error ? colors.colorError : undefined }}>
          <span style={{ marginRight: 24 }}>服务区域</span>
          { location && (
            <IconButton
              ripple colored name="add_circle"
              onClick={(e) => { e.preventDefault(); this.setState({ adding: true }); }}
            ></IconButton>
          )}
          { location ? (
            <Tooltip
              label={
                <div style={{ textAlign: 'left' }}>
                  <div>您可以设定多个服务区域</div>
                  <div>每个服务区域可以设置不同的配送策略</div>
                  <div>例如：</div>
                  <div>1. 区域 海淀区；起送金额：35元；免运费</div>
                  <div>2. 区域 北京市；起送金额：35元；运费：5元</div>
                  <div>3. 区域 新疆，西藏，青海，内蒙古；起送金额：100元；运费：20元</div>
                  <div>4. 区域 全国；起送金额：35元；运费：10元</div>
                  <div>不要求排列次序。当多个区域都可以匹配时，系统将自动选取运费最低的</div>
                </div>
              }
            >
              <IconButton name="help_outline"></IconButton>
            </Tooltip>
          ) : (
            <Tooltip
              label={
                <div style={{ textAlign: 'left' }}>
                  请先选择地址
                </div>
              }
            >
              <IconButton name="help_outline"></IconButton>
            </Tooltip>
          )
          }
        </div>
        <Areas
          areas={value}
          onChange={(newValue) => { onChange(newValue); }}
          location={location}
          adding={adding}
          onAddingFinish={() => { this.setState({ adding: false }); }}
        />
      </div>
    );
  }
}

export default injectSheet({
  field: { width: '100%' },
  title: { display: 'flex', alignItems: 'center' },
})(connect(
  (state) => ({ location: formValueSelector(FORM_NAME)(state, 'location') }),
)(AreasField));
