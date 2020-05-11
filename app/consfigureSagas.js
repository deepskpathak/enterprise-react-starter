import sagas from './serviceSagas';

/**
 * initializes global sagas
 *
 * @param store redux store which contains function to run sagas
 */
export default store => {
  if (store.runSaga === undefined)
    throw new ReferenceError('store.runSaga is undefined');

  sagas.map(saga => store.runSaga(saga));
};
