export function createStore(INITIAL_STATE, updater) {
  let state;

  if (!state) {
    state = INITIAL_STATE;
  }

  function doUpdater(data) {
    // state 변경을 앱이 원하는 시점에서 실행할 수 있도록 반환하는 state 변경 함수이다.
    state = updater(state, data);
  }

  function getState() {
    return state;
  }

  return {
    doUpdater,
    getState, // state를 바로 반환할 경우 값을 직접 참조하게 되므로 getter를 반환한다.
  };
}
