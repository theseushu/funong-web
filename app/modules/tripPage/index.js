import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Layout from 'modules/common/layout';
import { createTripProductSelector } from 'modules/data/ducks/selectors';
import { supplyLabels } from 'appConstants';
import Form from './form';
import Display from './display';

const EMPTY_PRODUCT = {
  name: '',
  specs: [{ name: '默认', params: ['123 rfdqf'], minimum: 1, unit: '斤', price: 1 }],
  location: null,
  desc: '',
  images: [],
  labels: [supplyLabels.available.value],
};

const TripPage = ({ product, params: { id }, location: { query } }) => (
  <Layout
    content={
        (id === 'new' || query.edit) ?
          <Form initialValues={product || EMPTY_PRODUCT} /> :
          <Display product={product} />
      }
    smallContent
  >
  </Layout>
  );

TripPage.propTypes = {
  product: PropTypes.object,
  location: PropTypes.object,
  params: PropTypes.object,
};

export default connect(
  (state, { params: { id } }) => ({ product: id === 'new' ? null : createTripProductSelector(id)(state) }),
)(TripPage);
