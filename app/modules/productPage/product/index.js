import React, { PropTypes } from 'react';

import Label from 'react-bootstrap/lib/Label';
import { formatAddress } from '../../../utils/displayUtils';
import { displayPeriod } from '../../../utils/momentUtils';


function renderSpecifications(product) {
  const { specifications } = product;
  return specifications.map((spec, i) => <Label key={i}>{spec.name}</Label>);
}

const Product = ({ product }) => (
  <div className="text-center">
    <h3>{product.species.name}</h3>
    <div>发货地点：{formatAddress(product.location)}</div>
    <div>详细规格：{renderSpecifications(product)}</div>
    <div>价格：{JSON.stringify(product.price)}</div>
    {
      product.available ?
        <div>现在有货</div> : <div>预售货品：{displayPeriod(product.startAt, product.endAt)}</div>
    }
    <p>
      {product.desc}
    </p>
    <div>
      {product.photos && product.photos.map((photo, i) => <div key={i}>
        <img role="presentation" src={photo.url} />
      </div>)}
    </div>
  </div>
);

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Product;
