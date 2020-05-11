import { is, where } from 'ramda';
import invariant from 'invariant';

/**
 * Validate the shape of redux store
 */
export default function checkStore(store) {
  const shape = {
    dispatch: is(Function),
    subscribe: is(Function),
    getState: is(Function),
    replaceReducer: is(Function),
    runSaga: is(Function),
    injectedReducers: is(Object),
    injectedSagas: is(Object),
  };
  invariant(
    where(shape, store),
    '(app/utils...) injectors: Expected a valid redux store',
  );
}
