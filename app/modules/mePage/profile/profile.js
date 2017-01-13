import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Card, CardTitle, CardMedia, CardActions } from 'react-mdl/lib/Card';
import Button from 'react-mdl/lib/Button';
import IconButton from 'react-mdl/lib/IconButton';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import Tooltip from 'react-mdl/lib/Tooltip';
import styles, { breakpoints } from '../../common/styles';
import Avatar from '../../common/avatar';
import AvatarCropper from '../avatarCropper';

class Profile extends Component {
  static propTypes = {
    sheet: PropTypes.object,
    user: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
  }
  render() {
    const { user, sheet: { classes } } = this.props;
    return (
      <div className={classes.content}>
        <Card shadow={2} style={{ width: '100%', margin: 'auto' }}>
          <CardTitle>
            <h2 className="mdl-card__title-text">个人信息</h2>
            <Tooltip label={<span>点击条目内容即可开始修改<br />您也可以点击图像更换新的头像</span>}>
              <IconButton colored name="help_outline"></IconButton>
            </Tooltip>
          </CardTitle>
          <CardMedia className={styles.contentCenter} style={{ background: 'none', padding: 16 }}>
            <div className={classes.avatar}>
              <Avatar />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <AvatarCropper />
              </div>
            </div>
          </CardMedia>
          <CardActions border>
            <Grid style={{ width: '100%', boxSizing: 'border-box' }}>
              <Cell component="h6" col={2} offsetDesktop={2} tablet={3} phone={4} style={{ display: 'flex', alignItems: 'center' }}>
                手机号
              </Cell>
              <Cell col={6} offsetDesktop={2} tablet={5} phone={3} offsetPhone={1} style={{ textAlign: 'left' }}>
                <Button colored>13012345678</Button>
              </Cell>
              <Cell component="h6" col={2} offsetDesktop={2} tablet={3} phone={4} style={{ display: 'flex', alignItems: 'center' }}>
                您的称呼
              </Cell>
              <Cell col={6} offsetDesktop={2} tablet={5} phone={3} offsetPhone={1} style={{ textAlign: 'left' }}>
                <Button colored>胡小为</Button>
              </Cell>
              <Cell component="h6" col={2} offsetDesktop={2} tablet={3} phone={4} style={{ display: 'flex', alignItems: 'center' }}>
                行业类型
              </Cell>
              <Cell col={6} offsetDesktop={2} tablet={5} phone={3} offsetPhone={1} style={{ textAlign: 'left' }}>
                <Button colored>批发商</Button>
                <Button colored>代办</Button>
                <Button colored>代卖</Button>
              </Cell>
              <Cell component="h6" col={2} offsetDesktop={2} tablet={3} phone={4} style={{ display: 'flex', alignItems: 'center' }}>
                修改密码
              </Cell>
              <Cell col={6} offsetDesktop={2} tablet={5} phone={3} offsetPhone={1} style={{ textAlign: 'left' }}>
                <Button colored>验证手机号码后开始</Button>
              </Cell>
              <Cell component="h6" col={2} offsetDesktop={2} tablet={3} phone={4} style={{ display: 'flex', alignItems: 'center' }}>
                个人介绍
              </Cell>
              <Cell col={6} offsetDesktop={2} tablet={5} phone={3} offsetPhone={1} style={{ textAlign: 'left' }}>
                <Button colored>介绍一下自己吧</Button>
              </Cell>
            </Grid>
          </CardActions>
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
  avatar: {
    width: 160,
    height: 160,
    position: 'relative',
  },
})(Profile);
