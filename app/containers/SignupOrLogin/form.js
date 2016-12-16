import React, {Component, PropTypes} from "react";
import {Field, reduxForm, SubmissionError} from "redux-form/immutable";
// import RequestSmsCodeButton from "../requestSmsCode/buttonWithCountDownTimer";
// import {saveSessionTokenInCookie, signUpOrlogInWithMobilePhone} from "../../api";
// import {actionCreators} from '../refreshSessionToken/ducks';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

//
// const confirmButtonStyle = () => ({
//   width: '60%',
//   maxWidth: '100%',
//   marginBottom: '20px'
// });
// const confirmPhoneField = () => ({
//   position: 'relative',
//   paddingLeft: '2em',
//   '> ._requestSmsButton': {
//     position: 'absolute',
//     height: '72px',
//     right: 0,
//     top: '14px',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center'
//   },
//   '> ._label': {
//     position: 'absolute',
//     left: 0,
//     top: '36px',
//   }
// });
// const errorMessage = ({color}) => ({
//   display: 'flex',
//   justifyContent: 'center',
//   color
//
// });

const validate = values => {
  const errors = {}
  if (!values.phone) {
    errors.phone = 'Required'
  } else if (!/1\d{10}$/i.test(values.phone)) {
    errors.phone = 'Must be 15 characters or less'
  }
  if (!values.smsCode) {
    errors.smsCode = 'Required'
  } else if (!/\d{6}$/i.test(values.smsCode)) {
    errors.smsCode = 'Invalid email address'
  }
  return errors
}
//
{/*<div className={renderer.renderRule(confirmPhoneField)}>
 {/*<TextField*/}
{/*name={name}*/}
{/*id={name}*/}
{/*type='tel'*/}
{/*floatingLabelText="手机号码"*/}
{/*onChange={e => onChange(e.target.value)}*/}
{/*value={value}*/}
{/*errorText={error}*/}
{/*maxLength={11}*/}
{/*fullWidth*/}

{/*/>*/}
{/*<CommunicationContactPhone className='_label' color={iconColor}/>*/}
{/*<div className="_requestSmsButton">*/}
{/*<RequestSmsCodeButton phone={value} disabled={!!error ? true : undefined}/>*/}
{/*</div>*/}
{/*</div>*/}
const PhoneField = ({name, input: {value, onChange}, meta: {error}}) => {
  console.log(error)
  return (
    <FormGroup validationState={error&&'error'}>
      <ControlLabel>Working example with validation</ControlLabel>
      <InputGroup>
        <InputGroup.Addon>
          $
        </InputGroup.Addon>
        <FormControl type='tel' name={name} value={value} maxLength={11} onChange={e => onChange(e.target.value)}/>
        <InputGroup.Button>
          <Button>Before</Button>
        </InputGroup.Button>
      </InputGroup>
      <HelpBlock>{error}</HelpBlock>
    </FormGroup>
  )
};
// PhoneField.contextTypes = {
//   renderer: PropTypes.object.isRequired
// }
//
// const SmsCodeField = ({name, input: {value, onChange}, meta, iconColor}, {renderer}) => {
//   return (
//     <div className={renderer.renderRule(confirmPhoneField)}>
//       <TextField
//         name={name}
//         id={name}
//         type='tel'
//         autoComplete="off"
//         floatingLabelText="短信验证码"
//         onChange={e => onChange(e.target.value)}
//         value={value}
//         errorText={meta.error}
//         maxLength={6}
//         fullWidth
//       />
//       <NotificationSms className='_label' color={iconColor}/>
//     </div>
//   )
// };
//
// SmsCodeField.contextTypes = {
//   renderer: PropTypes.object.isRequired
// }

class SignupOrLoginForm extends Component {
  onSubmit = (values) => {
    // const history = this.context.history;
    return new Promise((resolve, reject) => {
      signUpOrlogInWithMobilePhone(values.phone, values.smsCode)
        .then(user => {
          resolve(user);
          if (user.password != null) {
            // history.push('/desktops') //TODO go to former page
          } else {
            // history.push('/fetchProfile', {})
          }
        })
        .catch(err => {
          reject(new SubmissionError({_error: {code: err.code, message: err.message}}))
        })
    })
  }

  render() {
    const {handleSubmit, pristine, submitting, invalid, error} = this.props;
    const {renderer} = this.context;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <h3 className='pt-2'>立即加入</h3>
        <div>
          <Field name="phone" component={PhoneField}/>
        </div>
        <div>
          <label>smsCode</label>
          <Field name="smsCode" component="input" type="text"/>
        </div>
        { error && (
          <div className={''}>
            <span>{error.message}</span>
          </div>
        )
        }
        <div>
          <button type="submit" className={''}
                        disabled={pristine || invalid || submitting}>确定</button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'signupOrLogin',  // a unique identifier for this form
  validate,                // <--- validation function given to redux-form
})(SignupOrLoginForm)
