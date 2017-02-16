import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { actions, selectors } from 'api/profile';
import info from 'modules/toastr/info';
import UserTypes from './userTypes';
import nextRoute from '../nextRoute';

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
              case '农贸专家':
                info({
                  title: '您需要先通过我们的商家认证，才能开店',
                  onHideComplete: () => {
                    dispatch(push(nextRoute(type)));
                  },
                });
                break;
              case '微店店主':
                info({
                  title: '您需要先通过我们的商家认证，才能开店',
                  onHideComplete: () => {
                    dispatch(push(nextRoute(type)));
                  },
                });
                break;
              case '一般用户':
              case '农产农资收购':
              case '农产农资供货':
              case '物流供应商':
              default:
                dispatch(push(nextRoute(type)));
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
