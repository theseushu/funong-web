import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import RadioGroup from 'react-mdl/lib/RadioGroup';
import Radio from 'react-mdl/lib/Radio';
import { selector } from '../../api/fetchLocation';
import ContentMainRight from '../../common/content/mainRight';
import Carousel from './carousel';
import { humanizeTime, formatAddress, humanizeLnglat } from '../../../utils/displayUtils';
import { colors } from '../../common/styles';
import Label from '../../common/label';

class Specs extends Component {
  static propTypes = {
    specs: PropTypes.array.isRequired,
  }
  state = { index: 0 }
  render() {
    const { specs } = this.props;
    const { index } = this.state;
    const choosen = specs[index];
    return (
      <div>
        <h6 style={{ marginBottom: 16 }}>
          规格：
          {specs.length > 0 && (
            <RadioGroup
              name="demo" value={index} style={{ display: 'inline-block' }}
              onChange={(e) => this.setState({ index: Number(e.target.value) })}
            >
              { specs.map((spec, i) => <Radio value={i} key={i} ripple style={{ marginRight: 16 }}>{spec.name}</Radio>)}
            </RadioGroup>
          )}
        </h6>
        <div style={{ padding: '0 16px' }}>
          <p style={{ marginBottom: 8 }}>{choosen.params.map((param, i) => <span key={i} style={{ padding: '0 8' }}>{param}</span>)}</p>
          <p style={{ color: colors.colorPrice, fontSize: '1.2em' }}>{choosen.prices.map((price, i) => <span key={i} style={{ padding: '0 8' }}>{`${price.minCount}${price.unit}以上 每${price.unit}${price.value}元`}</span>)}</p>
        </div>
      </div>
    );
  }
}

const Display = ({ product, location, sheet: { classes } }) => ( // eslint-disable-line
  <ContentMainRight
    main={
      <div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: 300, marginRight: 24, boxSizing: 'border-box' }}>
            <Carousel width={300} height={400} images={product.desc.images.map((image) => ({ original: image.thumbnail_300_300, thumbnail: image.thumbnail_50_50 }))} />
          </div>
          <div style={{ flex: 1 }}>
            <h4><strong>{product.name}</strong></h4>
            <p style={{ color: colors.colorSubTitle }}>更新时间：{humanizeTime(product.updatedAt)}</p>
            <p style={{ color: colors.colorSubTitle }}>
              发货地：<span style={{}}>{formatAddress(product.address)}</span>
              <span> ({(location && location.lnglat) && humanizeLnglat(location.lnglat.latitude, location.lnglat.longitude, product.lnglat.latitude, product.lnglat.longitude)})</span>
            </p>
            <h6 style={{ color: colors.colorAccent }}>
              {product.price}
            </h6>
            <h6>
              品种品类：<Label style={{ background: colors.colorCategoryLabel }}>{product.category.name}</Label>{' '}
              <Label style={{ background: colors.colorSpeciesLabel }}>{product.species.name}</Label>
            </h6>
            <Specs specs={product.specs} />
          </div>
        </div>
        <div style={{ marginTop: 24 }} dangerouslySetInnerHTML={{ __html: product.desc.text }} />
      </div>
      }
    right={
      <div>
      </div>
      }
  />
  );

Display.propTypes = {
  sheet: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  location: PropTypes.object,
};

export default connect(
  (state) => ({ location: selector(state).location })
)(injectSheet({
})(Display));
