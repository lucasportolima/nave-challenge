import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  data: [],
  selectedNaver: null
};

export const addNaver = createAction('ADD_NAVER');
export const setNaver = createAction('SET_NAVER');
export const delNaver = createAction('DEL_NAVER');
export const addNavers = createAction('ADD_NAVERS');

export default createReducer(INITIAL_STATE, {
  [addNaver.type]: (state, action) => [...state, action.payload],
  [setNaver.type]: (state, { payload }) => ({ ...state, selectedNaver: payload }),
  [delNaver.type]: (state, { payload }) => ({ ...state, data: state.data.filter(el => el.id !== payload) }),
  [addNavers.type]: (state, { payload }) => ({ ...state, data: payload })
});
