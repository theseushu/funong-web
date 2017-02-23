import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { statusValues } from 'appConstants';
import styles from 'modules/common/styles';
import CertDisplay from 'modules/common/cert/display';
import moduleStyles from '../styles';
import createForm from './createForm';

class Personal extends Component {
  static propTypes = {
    classes: PropTypes.object,
    cert: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
  }
  render() {
    const { classes, cert } = this.props;
    let title;
    let display;
    if (cert && cert.status === statusValues.verified.value) {
      title = <h5 className={styles.colorVerified}>您已通过审核，正式成为富农认证农贸专家！</h5>;
      display = <CertDisplay cert={cert} />;
    } else {
      title = cert ? <h5>已提交以下资料<small>（可以修改）</small></h5> :
      <h5>请提交认证材料表明您的专家身份</h5>;
      const Form = createForm(cert);
      display = <Form />;
    }
    return (
      <div className={classes.wrapper}>
        {title}
        {display}
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

export default injectSheet(moduleStyles)(Personal);
