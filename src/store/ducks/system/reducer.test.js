import reducer, { INITIAL_STATE, toggleLoading } from './index';

describe('System Reducer', () => {
  test('Must return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  })

  test('Must return the updated loading state', () => {
    INITIAL_STATE.isLoading = !INITIAL_STATE.isLoading;
    expect(reducer(undefined, { type: toggleLoading.type, payload: INITIAL_STATE.isLoading })).toEqual(INITIAL_STATE);
  })
})