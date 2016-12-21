import React, { Component } from 'react';

import Appbar from '../common/Appbar';
import MainSection from '../common/mainSection';

import Form from './containers/form';

class Page extends Component {
  render() {
    return (
      <div>
        <Appbar />
        <MainSection>
          <div className="container">
            <Form />
          </div>
        </MainSection>
      </div>
    );
  }
}

export default Page;
