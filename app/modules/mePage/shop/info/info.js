import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import { Card, CardTitle, CardMedia } from 'react-mdl/lib/Card';
import Button from 'react-mdl/lib/Button';
import Icon from 'react-mdl/lib/Icon';
import IconButton from 'react-mdl/lib/IconButton';
import Tooltip from 'react-mdl/lib/Tooltip';
import styles, { breakpoints } from 'modules/common/styles';
import { createShopAuthorized } from 'funong-common/lib/utils/authUtils';
import Page from '../../page';
import Header from '../header';
import Editing from './editing';

const style = {
  media: {
    width: 100,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    '& > i': {
      fontSize: '50px',
    },
  },
};

const UnauthorizedComponent = ({ classes }) => (
  <Card shadow={2} style={{ width: '100%', margin: 'auto' }}>
    <CardTitle>
      <h2 className={`${styles.colorWarning} mdl-card__title-text`}>未认证</h2>
      <h2 className="mdl-card__title-text"><small>您需要先通过个人或商家认证，才能创建微店 <Link to="/me/certs?type=company">立即去验证</Link></small></h2>
    </CardTitle>
    <CardMedia className={styles.contentCenter} style={{ background: 'none' }}>
      <div className={classes.media}>
        <Icon className={styles.colorWarning} name="warning" />
      </div>
    </CardMedia>
  </Card>
);
UnauthorizedComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};
const Unauthorized = injectSheet(style)(UnauthorizedComponent);

const CreateButtonComponent = injectSheet(style)(({ classes, onClick }) => (
  <Card shadow={2} style={{ width: '100%', margin: 'auto' }}>
    <CardTitle>
      <h2 className="mdl-card__title-text">微店</h2>
      <h2 className="mdl-card__title-text"><small>您已通过富农认证，欢迎创建微店</small></h2>
    </CardTitle>
    <CardMedia className={styles.contentCenter} style={{ background: 'none' }}>
      <div className={classes.media}>
        <Button raised ripple accent name="playlist_add" onClick={onClick}>开始创建</Button>
      </div>
    </CardMedia>
  </Card>
));
CreateButtonComponent.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
const CreateButton = injectSheet(style)(CreateButtonComponent);

class Info extends Component {
  static propTypes = {
    sheet: PropTypes.object,
    user: PropTypes.object.isRequired,
    shop: PropTypes.object,
    location: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = { editing: false };
  }
  startEditing = (e) => {
    e.preventDefault();
    this.setState({ editing: true });
  }
  render() {
    const { location, user, shop, sheet: { classes } } = this.props;
    const { editing } = this.state;
    let content;
    if (!editing) {
      if (!createShopAuthorized(user, shop)) {
        if (!shop) {
          content = <Unauthorized />;
        } else {
          content = (
            <Card shadow={2} style={{ width: '100%', margin: 'auto' }}>
              <CardTitle>
                <h2 className="mdl-card__title-text">店铺信息</h2>
                <Tooltip label={<span>点击条目内容即可开始修改<br />您上传的第一张介绍图片将被用作店铺的背景</span>}>
                  <IconButton colored name="help_outline"></IconButton>
                </Tooltip>
              </CardTitle>
              <Editing shop={shop} />
            </Card>
          );
        }
      } else {
        content = <CreateButton user={user} onClick={this.startEditing} />;
      }
    } else {
      content = (
        <Card shadow={2} style={{ width: '100%', margin: 'auto' }}>
          <CardTitle>
            <h2 className="mdl-card__title-text">店铺信息</h2>
            <Tooltip label={<span>点击条目内容即可开始修改<br />您上传的第一张介绍图片将被用作店铺的背景</span>}>
              <IconButton colored name="help_outline"></IconButton>
            </Tooltip>
          </CardTitle>
          <Editing shop={shop} />
        </Card>
      );
    }
    return (
      <Page
        location={location} header={<Header />} helmet={{ title: '富农商城-我的店铺' }}
      >
        <div className={classes.content}>
          {content}
        </div>
      </Page>
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
    width: 100,
    height: 100,
    position: 'relative',
  },
})(Info);
