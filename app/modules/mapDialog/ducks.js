const OPEN_DIALOG = 'map_dialog/open';
const CLOSE_DIALOG = 'map_dialog/close';

export default {
  mapDialog: (state = { open: false, detailsEditable: false, onSubmit: () => {} }, { type, payload }) => {
    if (type === OPEN_DIALOG) {
      return { open: true, detailsEditable: payload.detailsEditable, onSubmit: payload.onSubmit, location: payload.location };
    } else if (type === CLOSE_DIALOG) {
      return { open: false, detailsEditable: false, onSubmit: () => {} };
    }
    return state;
  },
};

export const actions = {
  openDialog: ({ onSubmit, detailsEditable = false, location }) => ({ type: OPEN_DIALOG, payload: { onSubmit, detailsEditable, location } }),
  closeDialog: () => ({ type: CLOSE_DIALOG }),
};

export const selector = (state) => state.mapDialog;
