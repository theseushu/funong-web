import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { CardText } from 'react-mdl/lib/Card';
import PersonalCertForm from '../forms/personal';


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
    console.log(cert)
    return (
      <div>
        <PersonalCertForm cert={cert} />
        <CardText>
          <h5>审核须知：</h5>
          <ul className={classes.text}>
            <li>请选择网络安全环境提交认证信息</li>
            <li>我们保证您提供的信息将被予以保护，不挪作他用</li>
            <li>个人实名请上传手持身份证正面半身照、身份证正面照、身份证反面照三张图片</li>
            <li>身份证正面照片和反面照片必须为同一证件</li>
            <li>人物图像与身份证头像保持一致，人物要求露脸并保持五官清晰</li>
            <li>证件内容要求文字完整清晰可辨无遮挡</li>
            <li>请上传真实有效的证件照片，有效期至少保持一个月</li>
            <li>审核通过后不支持修改证件，请确定无误后提交审核</li>
            <li>临时身份证、第一代身份证、过期身份证将无法通过审核</li>
          </ul>
        </CardText>
      </div>
    );
  }
}

export default injectSheet({
  text: {
    marginTop: 0,
    fontSize: 'smaller',
    paddingLeft: 0,
    listStyle: 'none',
    textWrap: 'wrap',
  },
})(Personal);
