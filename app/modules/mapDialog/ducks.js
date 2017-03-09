const OPEN_DIALOG = 'map_dialog/open';
const CLOSE_DIALOG = 'map_dialog/close';

export default {
  mapDialog: (state = { open: false, detailsEditable: false, postAddress: false, onSubmit: () => {} }, { type, payload }) => {
    if (type === OPEN_DIALOG) {
      return { open: true, ...payload };
    } else if (type === CLOSE_DIALOG) {
      return { open: false, detailsEditable: false, postAddress: false, onSubmit: () => {} };
    }
    return state;
  },
};

export const actions = {
  openDialog: ({ onSubmit, detailsEditable = false, postAddress = false, location }) => ({ type: OPEN_DIALOG, payload: { onSubmit, detailsEditable, postAddress, location } }),
  closeDialog: () => ({ type: CLOSE_DIALOG }),
};

export const selector = (state) => state.mapDialog;
