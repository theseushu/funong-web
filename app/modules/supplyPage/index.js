import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Layout from 'modules/common/layout';
import { createSupplyProductSelector } from 'modules/data/ducks/selectors';
import Form from './form';
import Display from './display';

const EMPTY_PRODUCT = {
  category: null,
  species: null,
  name: '',
  specs: [],
  location: null,
  desc: null,
  available: true,
  labels: {},
};

// const EMPTY_PRODUCT = { available: true, category: { name: '人参果', objectId: '5859445ddc9477148f492652', catalog: { objectId: '1', name: 'aaaa', catalogType: 'adlafdjklsa' } }, species: { category: '5859445ddc9477148f492652', name: '人参果元宝', objectId: '58594477dc9477148f493350' }, name: '人参果 人参果元宝', specs: [{ name: '默认', params: ['123 rfdqf'], prices: [{ minCount: 1, unit: '斤', value: 1 }] }], location: { address: { country: '中国', province: '湖北省', city: '武汉市', district: '江夏区', details: '湖北省武汉市江夏区江夏区经济开发区藏龙岛街道藏龙大道40号湖北城市建设职业技术学院' }, lnglat: { longitude: 114.43427, latitude: 30.40506 } }, desc: { text: 'dfsadfdsafdsafdas', images: [{ name: '1485723387376.png', url: 'http://ac-ouy08OrF.clouddn.com/1e3f26168703a1a9ae8f.png', metaData: { owner: '58774b8d61ff4b0065df953d', width: 1024, height: 287 }, base64: '', mime_type: 'image/png', objectId: '588e56fb570c350062105312', __type: 'File', id: '588e56fb570c350062105312' }] } };


const LogisticsEditPage = ({ product, location: { query } }) => (
  <Layout
    content={
      query.edit ?
        <Form initialValues={product || EMPTY_PRODUCT} /> :
        <Display product={product} />
    }
    smallContent={!!query.edit}
  >
  </Layout>
  );

LogisticsEditPage.propTypes = {
  product: PropTypes.object,
  location: PropTypes.object,
};

export default connect(
  (state, { params: { id } }) => ({ product: id === 'new' ? null : createSupplyProductSelector(id)(state) }),
)(LogisticsEditPage);
