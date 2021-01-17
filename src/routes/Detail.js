import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

const Detail = ({ toDo }) => {
  console.log(toDo);
  // const id = useParams();   --> 이 방법이 리덕스를 쓰는 것 보다 간단함
  // console.log(id);
  return (
    <>
      <h1>{toDo?.text}</h1> {/*?를 쓰면 새로고침되어서 상태가 날라가지 않음*/}
      <h4>Created at: {toDo?.id}</h4>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { id },
    },
  } = ownProps;
  return { toDo: state.find(toDo => toDo.id === parseInt(id)) };
};

export default connect(mapStateToProps)(Detail);
