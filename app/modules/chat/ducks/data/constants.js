import { selector as rootSelector, namespace as rootNamespace } from '../constants';

export const SLICE_NAME = 'data';
export const namespace = `${rootNamespace}/${SLICE_NAME}`;
export const selector = (state) => rootSelector(state)[SLICE_NAME];
