import { createAction, createReducer } from '@reduxjs/toolkit';

export const INITIAL_STATE = {
  modals: {
    profile: {
      show: false
    },
    actions: {
      type: null,
      show: false
    }
  },
  isLoading: false
};

export const updateModal = createAction('UPDATE_MODAL');
export const toggleLoading = createAction('TOGGLE_LOADING');

export default createReducer(INITIAL_STATE, {
  [updateModal.type]: (state, { payload }) => ({ ...state, modals: payload }),
  [toggleLoading.type]: (state) => ({ ...state, isLoading: !state.isLoading })
});