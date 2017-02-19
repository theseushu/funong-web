import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import { Card, CardTitle, CardMedia } from 'react-mdl/lib/Card';
import Icon from 'react-mdl/lib/Icon';
import IconButton from 'react-mdl/lib/IconButton';
import Tooltip from 'react-mdl/lib/Tooltip';
import styles, { breakpoints } from 'modules/common/styles';
import Page from '../../page';

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

const NoShopComponent = ({ classes }) => (
  <Card shadow={2} style={{ width: '100%', margin: 'auto' }}>
    <CardTitle>
      <h2 className={`${styles.colorWarning} mdl-card__title-text`}>尚未开店</h2>
      <h2 className="mdl-card__title-text"><small>您尚未创建店铺，<Link to="/me/shop">立即去开店</Link></small></h2>
    </CardTitle>
    <CardMedia className={styles.contentCenter} style={{ background: 'none' }}>
      <div className={classes.media}>
        <Icon className={styles.colorWarning} name="warning" />
      </div>
    </CardMedia>
  </Card>
);
NoShopComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};
const NoShop = injectSheet(style)(NoShopComponent);

class Products extends Component {
  static propTypes = {
    sheet: PropTypes.object,
    user: PropTypes.object.isRequired,
    shop: PropTypes.object,
  }
  render() {
    const { user, shop, sheet: { classes } } = this.props;
    let content;
    if (!shop) {
      content = <NoShop />;
    } else {
      content = (
        <Card shadow={2} style={{ width: '100%', margin: 'auto' }}>
          <CardTitle>
            <h2 className="mdl-card__title-text">店铺信息</h2>
            <Tooltip label={<span>点击条目内容即可开始修改<br />您上传的第一张介绍图片将被用作店铺的背景</span>}>
              <IconButton colored name="help_outline"></IconButton>
            </Tooltip>
          </CardTitle>
        </Card>
      );
    }
    return (
      <Page>
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
})(Products);
