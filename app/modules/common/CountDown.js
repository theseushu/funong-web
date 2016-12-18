import React, { PropTypes, Children, Component } from 'react';
import _ceil from 'lodash/ceil';

export default class CountDown extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    interval: PropTypes.number,
    children: PropTypes.object.isRequired,
  }

  static defaultProps = {
    interval: 1000,
  }

  constructor(props, context) {
    super(props, context);
    const { value, interval } = props;
    this.init({ value, interval });
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillReceiveProps(nextProps) {
    clearInterval(this.timer);
    const { value, interval } = nextProps;
    this.init({ value, interval });
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  init = ({ value, interval }) => {
    const remains = _ceil(value / interval);
    this.state = { remains: remains > 0 ? remains : 0 };
  }

  startTimer = () => {
    const { interval = 1000 } = this.props;
    this.timer = setInterval(
      () => {
        const remains = this.state.remains - 1;
        this.setState({ remains: remains > 0 ? remains : 0 });
        if (remains <= 0) {
          clearInterval(this.timer);
        }
      }, interval
    );
  }

  render() {
    return React.cloneElement(Children.only(this.props.children), { remains: this.state.remains });
  }
}
