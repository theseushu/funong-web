import React, { Component, PropTypes } from 'react';
import _find from 'lodash/find';
import _delay from 'lodash/delay';
import injectJss from 'react-jss';
import { AutoComplete } from 'react-mdl-extra';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import Tooltip from 'react-mdl/lib/Tooltip';
import IconButton from 'react-mdl/lib/IconButton';
import Button from 'react-mdl/lib/Button';
import Spinner from 'react-mdl/lib/Spinner';
import { toastr } from 'react-redux-toastr';
import { selector as fetchSpeciesSelector, fetchSpecies as fetchSpeciesAction } from '../../../api/fetchSpecies';
import { selector as createSpeciesSelector, createSpecies as createSpeciesAction } from '../../../api/createSpecies';
import { speciesSelector } from '../../../data/ducks/selectors';
import FORM_NAME from '../formName';
import styles from '../../../common/styles';

const CreateButton = ({ createSpeciesState: { pending, error }, onClick }) => (
  <Button
    accent
    disabled={pending}
    onClick={(e) => { e.preventDefault(); onClick(); }}
  >
    {pending && '请稍候...'}
    {(!pending && error) && '重试'}
    {(!pending && !error) && '创建此品类'}
  </Button>
);
CreateButton.propTypes = {
  createSpeciesState: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};

class SpeciesField extends Component {
  static propTypes = {
    category: PropTypes.object,
    input: PropTypes.object.isRequired,
    meta: PropTypes.object,
    fetchSpeciesState: PropTypes.object,
    fetchSpecies: PropTypes.func,
    createSpeciesState: PropTypes.object,
    createSpecies: PropTypes.func,
    species: PropTypes.object,
    sheet: PropTypes.object,
  }
  constructor(props) {
    super(props);
    const { input: { value } } = props;
    this.state = { text: value ? value.name : '' };
  }
  componentWillReceiveProps({ input: { value } }) {
    this.state = { text: value ? value.name : '' };
  }
  onTextChange = (text) => {
    const trimmed = text.trim();
    const { species, input: { onChange } } = this.props;
    const matched = _find(species, (s) => s.name === trimmed);
    if (matched) {
      onChange(matched);
    } else {
      onChange(null);
      this.setState({ text: trimmed });
    }
  }
  onChange = (value) => {
    const { input: { onChange } } = this.props;
    onChange(value);
  }
  onBlur = () => {
    const { input: { onChange } } = this.props;
    _delay(() => { // onBlur happens before onChange, so choosing an item could cause blur too. delay this func to skip toastr call
      const { text } = this.state;
      if (this.enableCreating()) {
        const toastrType = 'warning';
        const toastrOptions = {
          icon: toastrType,
          status: toastrType,
          onOk: () => this.createSpecies(),
          onCancel: () => this.setState({ text: '' }, () => onChange(null)),
          okText: '保存并使用',
          cancelText: '放弃',
          transitionIn: 'fadeIn',
          transitionOut: 'fadeOut',
        };
        toastr.confirm(`您输入的品类${text}尚未保存，需要保存吗？`, toastrOptions);
      } else {
        this.setState({ text: '' });
      }
    }, 1);
  }
  createSpecies = () => {
    if (this.enableCreating()) {
      const text = this.state.text.trim();
      const { createSpecies, category, input: { onChange } } = this.props;
      createSpecies({ category,
        name: text,
        meta: {
          resolve: (species) => this.setState({ text: null, value: species }, () => {
            onChange(species);
          }),
        },
      });
    }
  }
  enableCreating = () => {
    const { input: { value } } = this.props;
    const { text } = this.state;
    if (!value && text) {
      return text.trim().length > 1;
    }
    return false;
  }
  render() {
    const { input: { value }, createSpeciesState, fetchSpeciesState, fetchSpecies, species, category, meta: { error }, sheet: { classes } } = this.props;
    const pending = createSpeciesState.pending || fetchSpeciesState.pending;
    const { text } = this.state;
    const enableCreating = this.enableCreating();
    return (
      <Grid>
        <Cell col={12} className={classes.species}>
          <div className={classes.wrapper}>
            <AutoComplete
              className={classes.input}
              label={'品类'}
              floatingLabel
              items={Object.values(species)}
              valueIndex={'objectId'}
              dataIndex={'name'}
              onChange={this.onChange}
              onTextChange={this.onTextChange}
              onFocus={() => fetchSpecies({ category })}
              onBlur={this.onBlur}
              disabled={!category}
              value={value || text}
              autoComplete="off"
              required={!!error}
              error={!value && ' '}
            />
            {enableCreating && <CreateButton createSpeciesState={createSpeciesState} onClick={this.createSpecies} />}
          </div>
          {pending && <div style={{ width: 32, height: 30 }}>
            <Spinner />
          </div>}
          {!category &&
            <Tooltip label={<span>请先选择品种<br /></span>}>
              <IconButton className={styles.colorError} name="help_outline"></IconButton>
            </Tooltip>
          }
        </Cell>
      </Grid>
    );
  }
}

export default connect(
  (state) => ({
    category: formValueSelector(FORM_NAME)(state, 'category'),
    fetchSpeciesState: fetchSpeciesSelector(state),
    createSpeciesState: createSpeciesSelector(state),
    species: speciesSelector(state),
  }),
  (dispatch) => bindActionCreators({
    fetchSpecies: fetchSpeciesAction,
    createSpecies: createSpeciesAction,
  }, dispatch)
)(injectJss({
  species: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    '& .mdl-autocomplete': {
      flex: 1,
      width: '100%',
    },
  },
  input: {
    width: '100%',
  },
})(SpeciesField));
