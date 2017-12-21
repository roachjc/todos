import { loadState, saveState } from './localStorage';
import throttle from 'lodash.throttle';
import { createStore } from 'redux';
import todoApp from './reducers';

// This creates the store, loads in any persisted state, creates necessary subscriptions
// Returns a store that is ready to be used by the running application
const configureStore = () => {
  // LOCAL STORAGE STATE PERSISTENCE
  // Load state from localStorage to initialize store below
  const persistedState = loadState();

  const store = createStore(
    todoApp,
    // When creating the store, we pass as second arg some state to initialize the state in the store
    // This overrides defaults set in rootReducer (todoApp) by passing as state to the reducer
    persistedState
  );

  // Any time the store is updated, save state is run and a copy is held locally
  store.subscribe(throttle(() => {
    saveState({
      // note we only save the todos not the visibilityFilter
      // so that still is reset to SHOW_ALL on refresh
      todos: store.getState().todos,
    });
    // By using _.throttle we can ensure that this only calls max 1/second
  }, 1000));

  return store;
};

export default configureStore;
