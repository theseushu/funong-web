import React, { Component, PropTypes } from 'react';
import _groupBy from 'lodash/groupBy';
import _sortBy from 'lodash/sortBy';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from 'react-router/lib/Link';
import { selectors, actions } from 'api/category';
import { categoriesSelector } from 'modules/data/ducks/selectors';
import injectSheet from 'react-jss';
import { colors } from 'modules/common/styles';
import blockLoading from 'assets/blockLoading.gif';

const { fetchCategories } = actions;
const fetchCategoriesSelector = selectors.fetchCategories;

class Categories extends Component {
  static propTypes = {
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
      objectId: PropTypes.string.isRequired,
      catalog: PropTypes.string.isRequired,
    }),
    classes: PropTypes.object.isRequired,
    catalogs: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    pending: PropTypes.bool,
    onSelect: PropTypes.func,
  }
  componentDidMount() {
    const { catalogs } = this.props;
    this.props.fetchCategories({ catalogs });
  }
  componentWillReceiveProps({ catalogs }) {
    if (catalogs !== this.props.catalogs) {
      this.props.fetchCategories({ catalogs });
    }
  }
  render() {
    const { categories, pending, classes, onSelect, category } = this.props;
    const groups = _groupBy(categories, (c) => c.group);
    return (
      <div className={classes.wrapper}>
        {
          pending ? (
            <div className={classes.loading}>
              <img src={blockLoading} role="presentation" />
            </div>
          ) : (
            <div className={classes.categories}>
              {Object.keys(groups).map((group, i) => (
                <dl key={i} className={classes.group}>
                  <dt>{group}<span className="_decor">{'>'}</span></dt>
                  <dd>
                    {_sortBy(groups[group], (c) => c.pinyin).map((c, j) => (
                      <Link
                        key={j}
                        className={category && category.objectId === c.objectId ? '_active' : null}
                        to={`/supplies?category=${c.objectId}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onSelect(c);
                        }}
                      >{c.name}</Link>
                    ))}
                  </dd>
                </dl>
              ))}
            </div>
          )
        }
      </div>
    );
  }
}

export default injectSheet({
  wrapper: {
    padding: '10px 24px',
    display: 'flex',
  },
  loading: {
    flex: 1,
    textAlign: 'center',
  },
  categories: {
  },
  group: {
    display: 'flex',
    alignItems: 'flex-start',
    '& > dt': {
      width: '5.2em',
      paddingRight: '1.2em',
      position: 'relative',
      '& > ._decor': {
        position: 'absolute',
        top: 0,
        right: 0,
      },
    },
    '& > dd': {
      flex: 1,
      '& > a': {
        fontSize: 14,
        display: 'inline-block',
        lineHeight: '14px',
        padding: '0 1em',
        borderLeft: `solid 1px ${colors.colorLightGrey}`,
        textDecoration: 'none',
        color: colors.colorSubTitle,
      },
      '& > a._active': {
        color: colors.colorAccent,
      },
    },
  },
})(
  connect(
    (state, { catalogs }) => ({ ...fetchCategoriesSelector(state), categories: categoriesSelector(state).filter((category) => catalogs.indexOf(category.catalog) >= 0) }),
    (dispatch) => bindActionCreators({ fetchCategories }, dispatch),
  )(Categories));

