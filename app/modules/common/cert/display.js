import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { certTypes } from 'appConstants';
import FilesUpload from 'modules/common/filesUpload';

const Cert = ({ cert, classes }) => {
  if (!cert) {
    return <div />;
  }
  const { type } = cert;
  switch (type) {
    case certTypes.personal.value:
      return (
        <div className={classes.cert}>
          <p>姓名：{cert.fields.name}</p>
          <p>身份证号：{cert.fields.IDCard}</p>
          <FilesUpload files={cert.images} editing={false} />
        </div>
      );
    case certTypes.company.value:
      return (
        <div className={classes.cert}>
          <p>名称：{cert.fields.name}</p>
          <p>法人代表：{cert.fields.corporate}</p>
          <p>{cert.fields.isUnified ? '三证合一' : '旧版'}</p>
          { cert.fields.unifiedCode && <p>统一社会信用代码：{cert.fields.unifiedCode}</p> }
          { cert.fields.registrationCode && <p>营业执照号码：{cert.fields.registrationCode}</p> }
          { cert.fields.cooperationCode && <p>组织机构代码：{cert.fields.cooperationCode}</p> }
          <FilesUpload files={cert.images} editing={false} />
        </div>
      );
    case certTypes.expert.value:
      return (
        <div className={classes.cert}>
          <div dangerouslySetInnerHTML={{ __html: cert.fields.desc }} />
          <FilesUpload files={cert.images} editing={false} />
        </div>
      );
    default:
      return <div />;
  }
};

Cert.propTypes = {
  cert: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  cert: {
    width: '100%',
    margin: '16px 0 16px 24px',
  },
})(Cert);
