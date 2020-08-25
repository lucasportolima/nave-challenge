import { updateModal } from './index';

describe('System Actions', () => {
  describe('Actions Types', () => {
    test('Must return the action type UPDATE_MODAL', () => {
      expect(updateModal.type).toEqual('UPDATE_MODAL');
    })
  })

  describe('Actions Creators', () => {
    test('Must return the action creator updateModal', () => {
      expect(updateModal()).toEqual({ type: updateModal.type, modals: undefined });
    })
  })
})