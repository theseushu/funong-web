import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Card, CardTitle, CardMenu, CardText, CardActions, CardMedia } from 'react-mdl/lib/Card';
import { Tabs, Tab } from 'react-mdl/lib/Tabs';
import Button from 'react-mdl/lib/Button';
import IconButton from 'react-mdl/lib/IconButton';
import RadioGroup from 'react-mdl/lib/RadioGroup';
import Radio from 'react-mdl/lib/Radio';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import { colors } from 'modules/common/styles';
import Label from 'modules/common/label';
import LabelWithBorder from 'modules/common/label/labelWithBorder';
import { humanizeTime, formatAddress, humanizeLnglat } from 'utils/displayUtils';
import Carousel from './carousel';
import AddToCartButton from './addToCartButton';

class ResponsiveCarouselCard extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    location: PropTypes.object,
    sheet: PropTypes.object.isRequired,
  }
  state = { specIndex: 0, tabIndex: 0 }
  render() {
    const { product: { name, images, category, species, specs, address, lnglat, desc }, location, sheet: { classes } } = this.props;
    const { specIndex, tabIndex } = this.state;
    return (
      <Card shadow={2} className={classes.card}>
        <CardTitle>{name}</CardTitle>
        <CardMenu>
          <IconButton name="share" />
        </CardMenu>
        <CardMedia className={classes.cardMedia}>
          <Carousel
            images={images.map((image) => ({ original: image.thumbnail_600_600, thumbnail: image.thumbnail_80_80 }))}
          />
        </CardMedia>
        <Grid>
          <Cell col={2} tablet={2} phone={2}>品种品类:</Cell>
          <Cell col={10} tablet={6} phone={2}>
            <Label style={{ background: colors.colorCategoryLabel }}>{category.name}</Label>
            {' '}
            <Label style={{ background: colors.colorSpeciesLabel }}>{species.name}</Label>
          </Cell>
          <Cell col={2} tablet={2} phone={2}>规格：</Cell>
          <Cell col={10} tablet={6} phone={2}>
            {specs.length > 0 && (
              <RadioGroup
                name="demo" value={specIndex} style={{ display: 'inline-block' }}
                onChange={(e) => this.setState({ specIndex: Number(e.target.value) })}
              >
                { specs.map((spec, i) => <Radio value={i} key={i} ripple style={{ marginRight: 16 }}>{spec.name}</Radio>)}
              </RadioGroup>
            )}
          </Cell>
          <Cell col={12} className={classes.specParams}>
            {specs[specIndex].params.map((param, i) => <LabelWithBorder key={i}>{param}</LabelWithBorder>)}
          </Cell>
          <Cell col={12} className={classes.priceLine}>
            <span style={{ padding: '0 8' }}>{`${specs[specIndex].minimum}${specs[specIndex].unit}以上 每${specs[specIndex].unit}${specs[specIndex].price}元`}</span>
          </Cell>
          <Cell col={6} tablet={4} phone={4} className={classes.small}>
            更新时间：{humanizeTime(131342432423)}
          </Cell>
          <Cell col={6} tablet={4} phone={4} className={classes.small}>
            发货地: {formatAddress(address)}
            <small>({(location && location.lnglat) && humanizeLnglat(location.lnglat.latitude, location.lnglat.longitude, lnglat.latitude, lnglat.longitude)})</small>
          </Cell>
        </Grid>
        <CardActions className={classes.buttons}>
          <Button raised accent ripple>在线联系</Button>
          <Button raised accent ripple>立即购买</Button>
          <AddToCartButton supplyProduct={this.props.product} specIndex={specIndex} quantity={specs[specIndex].minimum}>加入购物车</AddToCartButton>
        </CardActions>
        <div className={classes.tabs}>
          <Tabs activeTab={0} onChange={(tabId) => this.setState({ tabIndex: tabId })} ripple>
            <Tab>更多介绍</Tab>
            <Tab>评论</Tab>
          </Tabs>
        </div>
        {
          tabIndex === 0 && (
            <CardText>
              <div dangerouslySetInnerHTML={{ __html: desc }}></div>
            </CardText>
          )
        }
      </Card>
    );
  }
}

export default injectSheet({
  card: {
    width: '100%',
  },
  cardText: {
  },
  priceLine: {
    color: colors.colorPrice,
    fontSize: '1.2em',
    '& > span': {
      display: 'inline-block',
      marginRight: 36,
    },
  },
  small: {
    fontSize: '1rem',
    color: colors.colorSubTitle,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
    maxWidth: 500,
  },
  tabs: {
    display: 'flex',
    '& > div': {
      width: 'auto',
    },
  },
  specParams: {
    '& > span': {
      margin: '0 8px',
    },
  },
  cardMedia: {
    background: 'transparent',
  },
})(ResponsiveCarouselCard);
