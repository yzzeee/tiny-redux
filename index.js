import { createStore } from './redux.js';

const INITIAL_STATE = { count: 0, users: [], post: {} };
const ADD = 'ADD';
const SUBTRACT = 'SUBTRACT';
const SET_USERS = 'SET_USERS';
const GET_USERS = 'GET_USERS';
const SET_POST = 'SET_POST';
const GET_POST = 'GET_POST';

function actionCreator(type, payload) {
  return { type, payload };
}

const middleware1 = state => dispatch => action => {
  console.log('middleware 1');
  switch (action.type) {
    case GET_USERS:
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
          dispatch(actionCreator(SET_USERS, users));
        });
      break;
    default:
      dispatch(action);
  }
};

const middleware2 = state => dispatch => action => {
  console.log('middleware 2');
  switch (action.type) {
    case GET_POST:
      fetch(`https://jsonplaceholder.typicode.com/posts/${action.payload}`)
        .then(response => response.json())
        .then(post => {
          dispatch(actionCreator(SET_POST, post));
        });
      break;
    default:
      dispatch(action);
  }
};

// 앱의 상태에 따라 원하는 시점에 스토어의 상태를 바꿔줄 함수이다.
function reducer(state, action) {
  switch (action.type) {
    case ADD:
      return { ...state, count: state.count + action.payload };
    case SUBTRACT:
      return { ...state, count: state.count - action.payload };
    case SET_USERS:
      return { ...state, users: action.payload };
    case SET_POST:
      return { ...state, post: action.payload };
    default:
      console.log('해당 액션은 정의되지 않았습니다.');
      return state;
  }
}

const store = createStore(INITIAL_STATE, reducer, [middleware1, middleware2]);

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

store.dispatch(actionCreator(GET_USERS));
store.dispatch(actionCreator(GET_POST, 5));
