import { createStore } from "redux";

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

// action을 만드는 함수를 만들때 보통 reducer 위에 만든다
const addToDo = text => {
  return {
    type: ADD_TODO,
    text,
  };
};

const delToDo = id => {
  return {
    type: DELETE_TODO,
    id: parseInt(id),
  };
};

// reducer는 새로운 state를 리턴한다!
const reducer = (
  state = JSON.parse(localStorage.getItem("currentState")),
  action
) => {
  if (state === null) {
    state = [];
  }
  console.log("current state: ", state);
  switch (action.type) {
    case ADD_TODO:
      // 절대 state를 임의로 바꿔서는 안됨 state.push(action.text) 하지말라는 이야기임
      localStorage.setItem(
        "currentState",
        JSON.stringify([...state, { text: action.text, id: Date.now() }])
      );
      return [...state, { text: action.text, id: Date.now() }];
    case DELETE_TODO:
      localStorage.setItem(
        "currentState",
        JSON.stringify(state.filter(st => st.id !== action.id))
      );
      return state.filter(st => st.id !== action.id); // 절대 절대 state를 바꾸는 것이 아니라 새로운 것을 만들어야 함
    default:
      return state;
  }
};

const store = createStore(reducer);

export const actionCreators = {
  addToDo,
  delToDo,
};

// store.subscribe();

export default store;
