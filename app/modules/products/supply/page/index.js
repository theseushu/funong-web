import FormComponent from './form';
import Display from './display';
import createPage from '../../utils/page/createPage';
import type, { FORM_NAME, EMPTY_PRODUCT, actions } from '../constants';

export default createPage({ type, actions, EMPTY_PRODUCT, FORM_NAME, FormComponent, Display });
