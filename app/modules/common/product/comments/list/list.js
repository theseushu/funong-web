import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import blockLoading from 'assets/blockLoading.gif';
import Comment from './comment';

class List extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    pending: PropTypes.bool,
    comments: PropTypes.array.isRequired,
    search: PropTypes.func.isRequired,
    target: PropTypes.object.isRequired,
  }
  state = { page: 1, pageSize: 20 }
  componentDidMount() {
    const { page, pageSize } = this.state;
    const { target } = this.props;
    this.props.search({ ...target, page, pageSize });
  }
  render() {
    const { pending, comments, classes } = this.props;
    if (pending) {
      return (
        <div>
          <img src={blockLoading} role="presentation" />
        </div>
      );
    }
    return (
      <div className={classes.list}>
        <ul>
          {comments.map((comment, i) => <li key={i}><Comment comment={comment} /></li>)}
        </ul>
      </div>
    );
  }
}

export default injectSheet({
  list: {
    width: '100%',
    '& > ul': {
      listStyleType: 'none',
      margin: 0,
      padding: 0,
    },
  },
})(List);
