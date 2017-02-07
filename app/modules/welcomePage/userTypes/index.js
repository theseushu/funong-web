import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { actions, selectors } from 'api/profile';
import UserTypes from './userTypes';

const updateProfile = actions.update;
const selector = selectors.update;

export default connect(
  (state) => selector(state),
  (dispatch) => ({
    onClick: ({ type: typeValue }) => {
      bindActionCreators({ updateProfile }, dispatch).updateProfile({ type: typeValue,
        meta: {
          resolve: ({ type }) => {
            switch (type) {
              case '一般用户':
                dispatch(push('/'));
                break;
              case '微店店主':
                dispatch(push('/me/shop'));
                break;
              case '农产农资收购':
                dispatch(push('/me'));
                break;
              case '农产农资供货':
                dispatch(push('/me'));
                break;
              case '物流供应商':
                dispatch(push('/me'));
                break;
              case '农贸专家':
                dispatch(push('/me/certifications'));
                break;
              default:
                // todo shouldn't happen. but if it happens, go to index
                dispatch(push('/'));
            }
          },
          reject: (error) => {
          // todo
            console.log(error.code); // eslint-disable-line
          },
        } });
    },
  }),
)(UserTypes);
