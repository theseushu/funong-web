import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Tooltip from 'react-mdl/lib/Tooltip';
import Button from 'react-mdl/lib/Button';
import Textfield from 'react-mdl/lib/Textfield';

import { colors } from '../../common/styles';

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = { nameEditing: false, activeTab: 0 };
  }
  render() {
    const { sheet: { classes } } = this.props;
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ textAlign: 'left', flex: 1 }}>
            <h6 style={{ color: colors.colorSubTitle }}>
              称呼
            </h6>
            <p>
              { this.state.nameEditing ?
                <div>
                  <Textfield label="您的称呼" defaultValue="胡小为" maxLength="11" style={{ width: 200 }} />
                  <Button accent onClick={() => this.setState({ nameEditing: false })}>保存</Button>
                </div> :
                <Button primary onClick={() => this.setState({ nameEditing: true })}>胡小为</Button>
              }
            </p>
          </div>
          <Tooltip label={<span>点击条目内容即可开始修改</span>}>
            <Button primary>修改信息<i style={{ fontSize: '1em' }} className="material-icons">help_outline</i></Button>
          </Tooltip>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'left', flex: 1, minWidth: 150 }}>
            <h6 style={{ color: colors.colorSubTitle }}>
              所在地
            </h6>
            <p>
              <Button primary>湖北省武汉市江夏区</Button>
            </p>
          </div>
          <div style={{ textAlign: 'left', flex: 1, minWidth: 150 }}>
            <h6 style={{ color: colors.colorSubTitle }}>
              绑定手机号
            </h6>
            <p>
              <Button primary onClick={() => this.setState({ phoneEditing: true })}>13112345678</Button>
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'left', flex: 1, minWidth: 150 }}>
            <h6 style={{ color: colors.colorSubTitle }}>
              实名认证
            </h6>
            <p>
              <Button primary>开始认证</Button>
            </p>
          </div>
          <div style={{ textAlign: 'left', flex: 1, minWidth: 150 }}>
            <h6 style={{ color: colors.colorSubTitle }}>
              企业认证
            </h6>
            <p>
              <Button primary>开始认证</Button>
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'left', flex: 1 }}>
            <h6 style={{ color: colors.colorSubTitle }}>
              修改密码
            </h6>
            <p>
              13112345678<Button primary>验证手机后开始</Button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Info.propTypes = {
  sheet: PropTypes.object.isRequired,
};

export default injectSheet({})(Info);
