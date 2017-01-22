import React, { Component } from 'react';
import Button from 'react-mdl/lib/Button';
import Link from 'react-router/lib/Link';

class Supply extends Component { // eslint-disable-line
  render() {
    return (
      <div>
        <div>
          <Link to="/supply/new"><Button colored>添加</Button></Link>
        </div>
      </div>
    );
  }
}

export default Supply;
