import React, { Component, PropTypes } from 'react';
import _find from 'lodash/find';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import injectSheet from 'react-jss';
import Textfield from 'react-mdl/lib/Textfield';
import ApiButtonWithIcon from 'modules/common/buttons/ApiButtonWithIcon';
import { selectors, actions } from 'api/species';

const createSpeciesAction = actions.create;
const createSpeciesSelector = selectors.create;


class CreateSpecies extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
    species: PropTypes.array.isRequired,
    pending: PropTypes.bool,
    create: PropTypes.func.isRequired,
    onCreated: PropTypes.func.isRequired,
  }
  state = { name: '' }
  render() {
    const { category, species, pending, create, onCreated, classes } = this.props;
    const { name } = this.state;
    let error;
    if (_find(species, (s) => s.name === name.trim())) {
      error = '已有同名的品种';
    } else if (name.trim().length < 3) {
      error = '名称至少3个字';
    }
    return (
      <div>
        <div>没有您想要的？创建一个新的吧</div>
        <div className={classes.wrapper}>
          <Textfield
            label={'新品种名称'}
            floatingLabel
            onChange={(e) => this.setState({ name: e.target.value })}
            value={name}
            autoComplete="off"
            error={error}
          />
          <ApiButtonWithIcon
            icon="save"
            type="submit" raised accent
            pending={pending}
            disabled={pending || !!error}
            onClick={(e) => {
              e.preventDefault();
              create({
                category,
                name: name.trim(),
                meta: {
                  resolve: (s) => this.setState({ name: '' }, () => {
                    onCreated(s);
                  }),
                },
              });
            }}
          >创建</ApiButtonWithIcon>
        </div>
      </div>
    );
  }
}

export default injectSheet({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    '& > .mdl-textfield': {
      flex: 1,
    },
    '& > button': {
      width: 85,
    },
  },
})(connect(
  (state) => ({ ...createSpeciesSelector(state) }),
  (dispatch) => bindActionCreators({ create: createSpeciesAction }, dispatch),
)(CreateSpecies));
