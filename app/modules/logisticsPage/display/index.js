import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { selector } from '../../api/fetchLocation';
import ContentMainRight from '../../common/content/mainRight';
import Carousel from './carousel';
import { humanizeLnglat, humanizeTime, formatAddress } from '../../../utils/displayUtils';
import { colors } from '../../common/styles';

const Display = ({ product, location, sheet: { classes } }) => ( // eslint-disable-line
  <ContentMainRight
    main={
      <div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: 300, marginRight: 24, boxSizing: 'border-box' }}>
            <Carousel width={300} height={400} images={product.desc.images.map((image) => ({ original: image.thumbnail_300_300, thumbnail: image.thumbnail_50_50 }))} />
          </div>
          <div style={{ flex: 1, color: colors.colorSubTitle }}>
            <h4><strong>{product.name}</strong></h4>
            <p>更新时间：{humanizeTime(product.updatedAt)}</p>
            <h6 style={{ color: colors.colorAccent }}>
              {product.price}
            </h6>
            <p>
                常驻地：<span style={{}}>{formatAddress(product.address)}</span>
              <span> ({(location && location.lnglat) && humanizeLnglat(location.lnglat.latitude, location.lnglat.longitude, product.lnglat.latitude, product.lnglat.longitude)})</span>
            </p>
            <p style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <span>最大运量：{product.capacity}吨</span><span>车辆数：{product.maxNumber}</span>
            </p>
            <p>
                服务区域：
                { product.range.map((province, i) => <span key={i}> {province.title}</span>) }
            </p>
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
