import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';
import blockLoading from 'assets/blockLoading.gif';
import { required } from './validations';
import styles from '../styles';

class RichTextField extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    label: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.state = { Editor: null };
  }
  componentDidMount() {
    this.mounted = true;
    this.loadEditor();
  }
  componentWillUnmount() {
    this.mounted = false;
    this.setState({ Editor: null });
  }
  loadEditor = () => {
    System.import('modules/common/editor').then((module) => {
      if (this.mounted && !this.state.Editor) {
        this.setState({ Editor: module.default });
      }
    });
  }
  renderEditor = () => {
    // todo place holder using textLabel
    const { input: { value, onChange } } = this.props; // eslint-disable-line
    const { Editor } = this.state;
    if (Editor) {
      return <Editor onChange={onChange} content={value} />;
    }
    return <div><img src={blockLoading} role="presentation" /></div>;
  }
  render() {
    const { meta: { error }, label } = this.props;
    return (
      <div className={styles.w100}>
        <div className={error ? styles.colorError : null}>
          {label}
        </div>
        {this.renderEditor()}
      </div>
    );
  }
}

export default ({ ...props }) => <Field name="desc" validate={[required]} component={RichTextField} props={{ ...props }} />;
