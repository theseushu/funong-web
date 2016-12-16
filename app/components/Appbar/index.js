/**
*
* Appbar
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Appbar() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Appbar.propTypes = {

};

export default Appbar;
