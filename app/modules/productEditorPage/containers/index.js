import React, { Component, PropTypes } from 'react';

import Appbar from '../../common/Appbar';
import MainSection from '../../common/mainSection';

class Page extends Component {
  render() {
    return (
      <div>
        <Appbar />
        <MainSection>
        </MainSection>
      </div>
    );
  }
}

export default Page;

