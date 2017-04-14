import React, { Component, PropTypes } from 'react';

export default (WrappedComponent) => class extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
  }
  componentWillMount() {
    this.setState({ Comp: WrappedComponent, loading: true });
  }
  componentDidMount() {
    const { store } = this.context;
    System.import('./init').then((initModule) => {
      const init = initModule.default;
      const connect = init(store);
      this.setState({ Comp: connect()(WrappedComponent), loading: false });
    });
  }
  render() {
    const { Comp, loading } = this.state;
    return <Comp loading={loading} {...this.props} />;
  }
};
