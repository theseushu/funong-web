import React from 'react';

import Appbar from '../common/Appbar';
import MainSection from '../common/mainSection';

import Form from './form';

export default () => (
  <div>
    <Appbar />
    <MainSection>
      <div className="container">
        <Form />
      </div>
    </MainSection>
  </div>
);

