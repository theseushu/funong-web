import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Panel from 'react-bootstrap/lib/Panel';
import Media from 'react-bootstrap/lib/Media';
import Label from 'react-bootstrap/lib/Label';
import FaQuestionCircle from 'react-icons/lib/fa/question-circle';
import { humanizeTime } from '../../utils/momentUtils';
import { formatAddress } from '../../utils/displayUtils';

const styles = {
  left: {
    width: 64,
    height: 64,
    '@media (min-width: 576px)': {
      width: 100,
      height: 100,
    },
  },
};

function renderThumbnail(product, className) {
  const { photos } = product;
  if (photos && photos.length > 0) {
    return <img role="presentation" className={className} src={photos[0].url} />;
  }
  return <FaQuestionCircle className={className} />;
}

function renderSpecifications(product) {
  const { specifications } = product;
  return specifications.map((spec, i) => <Label key={i}>{spec.name}</Label>);
}
const Product = ({ product, sheet: { classes } }) => (
  <Panel>
    <Media>
      <Media.Left>
        <a href={`/product/${product.objectId}`}>
          {renderThumbnail(product, classes.left)}
        </a>
      </Media.Left>
      <Media.Body>
        <Media.Heading>{product.species.name}<small>{` ${humanizeTime(product.createdAt)}`}</small></Media.Heading>
        <div>{formatAddress(product.location)}</div>
        <div>{renderSpecifications(product)}</div>
        <div>{product.desc}</div>
      </Media.Body>
    </Media>
  </Panel>
);

Product.propTypes = {
  product: PropTypes.object.isRequired,
  sheet: PropTypes.object.isRequired,
};

export default injectSheet(styles)(Product);
