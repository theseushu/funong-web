import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { colors } from 'modules/common/styles';
import createForm from './createForm';

class Personal extends Component {
  static propTypes = {
    sheet: PropTypes.object,
    cert: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
  }
  render() {
    const { sheet: { classes }, cert } = this.props;
    const Form = createForm(cert);
    return (
      <div className={classes.wrapper}>
        <Form />
        <div className={classes.instructions}>
          <h5>审核须知</h5>
          <ul className={classes.text}>
            <li>请选择网络安全环境提交认证信息</li>
            <li>官方机构认证的证书照片最佳</li>
            <li>您也可以输入可在线查询的网址</li>
            <li>我们保证您提供的信息将被予以保护，不挪作他用</li>
            <li>证件内容要求文字完整清晰可辨无遮挡</li>
            <li>请上传真实有效的证件照片，有效期至少保持一个月</li>
            <li>审核通过后不支持修改证件，请确定无误后提交审核</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default injectSheet({
  wrapper: {
    maxWidth: 580, margin: '0 auto', padding: 16,
  },
  instructions: {
    color: colors.colorSubTitle,
  },
  sampleImages: {
    listStyle: 'none',
  },
  text: {
    marginTop: 0,
    fontSize: 'smaller',
    paddingLeft: 0,
    listStyle: 'none',
    textWrap: 'wrap',
  },
})(Personal);
