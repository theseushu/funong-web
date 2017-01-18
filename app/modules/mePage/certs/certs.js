import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card';
import Button from 'react-mdl/lib/Button';
import IconButton from 'react-mdl/lib/IconButton';
import Icon from 'react-mdl/lib/Icon';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import { Tabs, Tab } from 'react-mdl/lib/Tabs';
import Textfield from 'react-mdl/lib/Textfield';
import styles, { breakpoints } from '../../common/styles';

class Certs extends Component {
  static propTypes = {
    sheet: PropTypes.object,
    user: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
  }
  render() {
    const { user: { profile: { type } }, sheet: { classes } } = this.props;
    return (
      <div className={classes.content}>
        <Card shadow={2} style={{ width: '100%', margin: 'auto' }}>
          <CardTitle>
            实名认证
          </CardTitle>
          <Tabs activeTab={this.state.activeTab} className={classes.tab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
            <Tab><span>个人<Icon colored name="check_circle" style={{ fontSize: '1em' }} /></span></Tab>
            <Tab>个体</Tab>
            <Tab>企业</Tab>
          </Tabs>
          <form>
            <Grid>
              <Cell col={12}>
                <h5>请提交以下认证材料<small>（手持身份证正面半身照、身份证正面照、身份证反面照）</small></h5>
              </Cell>
              <Cell col={6} tablet={4} phone={4}>
                <Textfield floatingLabel label="姓名" required style={{ width: '100%' }} />
              </Cell>
              <Cell col={6} tablet={4} phone={4} style={{ display: 'flex', alignItems: 'center' }}>
                <h5 style={{ margin: 0 }}><small>请输入身份证上相同的姓名</small></h5>
              </Cell>
              <Cell col={6} tablet={4} phone={4}>
                <Textfield floatingLabel label="身份证号" required style={{ width: '100%' }} />
              </Cell>
              <Cell col={6} tablet={4} phone={4} style={{ display: 'flex', alignItems: 'center' }}>
                <h5 style={{ margin: 0 }}><small>请保证号码与照片上一致</small></h5>
              </Cell>
            </Grid>
          </form>
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
        </Card>
      </div>
    );
  }
}

export default injectSheet({
  content: {
    flex: '1',
    marginLeft: 24,
    [breakpoints.mediaDestkopBelow]: {
      marginLeft: 0,
    },
  },
  tab: {
    '& .mdl-tabs__tab-bar': {
      borderBottom: 'none',
    },
  },
  text: {
    marginTop: 0,
    fontSize: 'smaller',
    paddingLeft: 0,
    listStyle: 'none',
  },
})(Certs);
