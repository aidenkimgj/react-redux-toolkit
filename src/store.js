import { createStore } from "redux";
import {
  configureStore,
  createAction,
  createReducer,
  createSlice,
} from "@reduxjs/toolkit";

const addToDo = createAction("ADD_TODO");
const delToDo = createAction("DELETE_TODO");

/* 옛날 방식
// reducer는 새로운 state를 리턴한다!
const reducer = (
  state = JSON.parse(localStorage.getItem("currentState")),
  action
) => {
  if (state === null) {
    state = [];
  }
  console.log("current state: ", state);
 
  console.log(action);
   switch (action.type) {
    case addToDo.type:
      // 절대 state를 임의로 바꿔서는 안됨 state.push(action.text) 하지말라는 이야기임
      localStorage.setItem(
        "currentState",
        JSON.stringify([...state, { text: action.payload, id: Date.now() }])
      );
      return [...state, { text: action.payload, id: Date.now() }];
    case delToDo.type:
      localStorage.setItem(
        "currentState",
        JSON.stringify(state.filter(st => st.id !== action.payload))
      );
      return state.filter(st => st.id !== action.payload); // 절대 절대 state를 바꾸는 것이 아니라 새로운 것을 만들어야 함
    default:
      return state;
  }
}; */

/*  최신 옛날 방식
// 툴킷으로 짜는 reducer에서는 state를 mutate 해도 된다! 또한 새로운 state를 기존 state로 mutate해서 만들어도 되지만 새로운 state를 만들어서 리턴을 해줘도 된다
const reducer = createReducer([], {
  [addToDo]: (state, action) => {
    state.push({ text: action.payload, id: Date.now() }); // 기존의 state를 mutate 하는 방법 redux 툴킷과 immer에서 이것을 처리해 준다 (리턴하지 않는 것이 특징!!!!)
  },
  [delToDo]: (state, action) => state.filter(st => st.id !== action.payload), // 새로운 state를 바로 리턴하는 것, 리턴을 할때는 무조건 새로운 state를 만들어서 리턴해야 한다.
}); */

// 이 방식은 action과 reducer를 한꺼번에 만들 수 있다.
const toDos = createSlice({
  name: "toDosReducer",
  initialState: [],
  reduces: {
    add: (state, action) => {
      state.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action) => state.filter(st => st.id !== action.payload),
  },
});

// const store = createStore(reducer);
// const store = configureStore({ reducer }); // 이것을 쓰면 브라우저에서 redux 개발 툴을 사용할 수 있음
// 최신 방식

console.log(toDos.reducer);

/* 옛날 방식 
export const actionCreators = {
  addToDo,
  delToDo,
}; */

// new way
export const { add, remove } = toDos.actions;
// store.subscribe();

export default configureStore({ reducer: toDos.reducer });
