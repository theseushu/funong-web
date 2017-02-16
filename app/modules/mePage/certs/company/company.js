import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import styles, { colors } from 'modules/common/styles';
import FilesUpload from 'modules/common/filesUpload';
import CertDisplay from 'modules/common/cert/display';
import { statusValues } from 'appConstants';
import createForm from './createForm';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';
import image6 from '../assets/image6.jpg';


class Company extends Component {
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
    let title;
    let display;
    if (cert && cert.status === statusValues.verified.value) {
      title = <h5 className={styles.colorVerified}>您已通过审核！</h5>;
      display = <CertDisplay cert={cert} />;
    } else {
      title = cert ? <h5>已提交以下资料<small>（可以修改）</small></h5> :
      <h5>请提交以下认证材料<small>（三证和一执照或营业执照+组织机构代码照）</small></h5>;
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
            { id: '', url: image4, metaData: { width: 2048, height: 1536 } },
            { id: '', url: image5, metaData: { width: 1024, height: 726 } },
            { id: '', url: image6, metaData: { width: 207, height: 303 } }]
          }
          />
          <h5>审核须知</h5>
          <ul className={classes.text}>
            <li>您提供的信息仅供惠农网实名认证，不挪作他用</li>
            <li>三证合一的企业请上传有效的统一社会信用代码证件照</li>
            <li>非三证合一企业请上传有效营业执照和组织机构代码证件，两证需齐全</li>
            <li>企业名称、法人代表请与证件上名称保持一致</li>
            <li>证件要求完整清晰无遮挡</li>
            <li>证件上文字清晰可辨</li>
            <li>证件未备案、过期将无法通过审核</li>
            <li>审核通过后，不支持修改，请核实后确认提交</li>
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
})(Company);
