import { selector as moduleSelector, actions } from './ducks';

export const selector = moduleSelector;

export const uploadFile = actions.uploadFile;

export const uploadFileProgress = actions.uploadFileProgress;
