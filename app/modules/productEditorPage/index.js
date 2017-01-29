import React from 'react';
import Layout from '../common/layout';

import createForm from './form';

export default () => {
  const Form = createForm();
  return (
    <Layout
      content={<Form />}
      smallContent
    >
    </Layout>
  );
};
