import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { add } from "../store";
import ToDo from "../components/ToDo.js";

const Home = ({ toDos, addToDo }) => {
  console.log(toDos);
  console.log(addToDo);
  const [text, setText] = useState("");

  const onChange = e => {
    setText(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    console.log(text);
    addToDo(text);
    setText("");
  };

  // const saveLocalStorage = toDos => {
  //   localStorage.setItem("currentState", JSON.stringify(toDos));
  // };

  // useEffect(() => {
  //   saveLocalStorage(toDos);
  // }, [text]);

  return (
    <div>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter what ever you want"
          value={text}
          onChange={onChange}
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map(toDo => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </div>
  );
};

// 이 함수는 Home으로 보내주는 props에 추가될 수 있도록 허용해 준다 (store.getState() 와 같은 역할)
const mapStateToProps = state => {
  return { toDos: state };
};
// dispatch는 함수이다 이것이 reducer에 값을 전달한다. (store.dispatch() 와 같은 역할)
/* const mapDispatchToProps = dispatch => {
  return {
    addToDo: text => dispatch(add(text)),
  };
}; */

const mapDispatchToProps = dispatch => {
  return {
    addToDo: text => dispatch(add(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
