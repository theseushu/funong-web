import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions, selectors } from 'api/comment';
import { commentsSelector } from 'modules/data/ducks/selectors';
import List from './list';

const search = actions.search;
const searchSelector = selectors.search;

export default connect(
  (state) => {
    const searchState = searchSelector(state);
    const ids = searchState.result || [];
    return {
      ...state,
      comments: commentsSelector(state).filter((comment) => ids.indexOf(comment.objectId) >= 0),
    };
  },
  (dispatch) => bindActionCreators({ search }, dispatch),
)(List);
