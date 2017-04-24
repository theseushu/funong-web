import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import styles from 'modules/common/styles';
import CertDisplay from 'modules/common/cert/display';
import FilesUpload from 'modules/common/filesUpload';
import { statusValues } from 'funong-common/lib/appConstants';
import moduleStyles from '../styles';
import createForm from './createForm';
import image1 from '../assets/img1.png';
import image2 from '../assets/img2.png';
import image3 from '../assets/img3.png';


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
      title = <h5 className={styles.colorVerified}>您已通过审核！</h5>;
      display = <CertDisplay cert={cert} />;
    } else {
      title = cert ? <h5>已提交以下资料<small>（可以修改）</small></h5> :
      <h5>请提交以下认证材料<small>（手持身份证正面半身照、身份证正面照、身份证反面照）</small></h5>;
      const Form = createForm(cert);
      display = <Form />;
    }
    return (
      <div className={classes.wrapper}>
        {title}
        {display}
        <div className={classes.instructions}>
          <h5>示例照片</h5>
          <FilesUpload
            onChange={() => {}} files={[
            { id: '', url: image1, metaData: { width: 685, height: 308 } },
            { id: '', url: image2, metaData: { width: 710, height: 307 } },
            { id: '', url: image3, metaData: { width: 732, height: 984 } }]
          }
          />
          <h5>审核须知</h5>
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
        </div>
      </div>
    );
  }
}

export default injectSheet(moduleStyles)(Personal);
