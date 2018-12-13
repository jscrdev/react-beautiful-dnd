// @flow
import type { Action, Dispatch } from '../store-types';
import type { StyleMarshal } from '../../view/dom-nodes/style-marshal/style-marshal';

export default (marshal: StyleMarshal) => () => (next: Dispatch) => (
  action: Action,
): any => {
  if (action.type === 'INITIAL_PUBLISH') {
    marshal.dragging();
  }

  if (action.type === 'DROP_ANIMATE') {
    marshal.dropping(action.payload.result.reason);
  }

  // this will clear any styles immediately before a reorder
  if (action.type === 'CLEAN' || action.type === 'DROP_COMPLETE') {
    marshal.resting();
  }

  next(action);
};
