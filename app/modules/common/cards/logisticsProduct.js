import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import Icon from 'react-mdl/lib/Icon';
import Button from 'react-mdl/lib/Button';
import IconButton from 'react-mdl/lib/IconButton';
import MediaLeftCard from './mediaLeftCard';

const LogisticsCard = ({ product, className, hideActions = true }) => {
  const { thumbnail, name, price, range, available } = product;
  return (
    <MediaLeftCard
      className={className}
      thumbnail={thumbnail ? <div style={{ backgroundImage: `url(${thumbnail.thumbnail_300_300})` }}></div> : <Icon name="local_shipping" />}
      title={name}
      subtitle="认证信息, 评价..."
      content={price}
      secondaryCotent={range.map((province, i) => <span key={i}>{province.title}</span>)}
      actions={hideActions ? [] : [
        <Button key={0} colored accent={available}>{available ? '下架' : '上架'}</Button>,
        <Link key={1} to={`/logistics/${product.objectId}`}><IconButton colored name="edit"></IconButton></Link>,
        <IconButton key={2} accent name="delete_sweep">删除</IconButton>,
      ]}
    />
  );
};

LogisticsCard.propTypes = {
  product: PropTypes.object.isRequired,
  className: PropTypes.string,
  hideActions: PropTypes.bool,
};

export default LogisticsCard;
