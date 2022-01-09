import { createStore } from './redux.js';

const INITIAL_STATE = { count: 0 };
const ADD = 'ADD';
const SUBTRACT = 'SUBTRACT';

function actionCreator(type, payload) {
  return { type, payload };
}

// 앱의 상태에 따라 원하는 시점에 스토어의 상태를 바꿔줄 함수이다.
function reducer(state, action) {
  switch (action.type) {
    case ADD:
      return { ...state, count: state.count + action.payload };
    case SUBTRACT:
      return { ...state, count: state.count - action.payload };
    default:
      console.log('해당 액션은 정의되지 않았습니다.');
  }
}

const store = createStore(INITIAL_STATE, reducer);

function listener() {
  console.log(store.getState());
}

store.subscribe(listener);

store.dispatch(actionCreator(ADD, 4));
store.dispatch(actionCreator(SUBTRACT, 7));

function dispatchAdd(data) {
  store.dispatch(actionCreator(ADD, data));
}

dispatchAdd(7);
