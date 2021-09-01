import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { connect } from "react-redux";

function reduxP(props) {
  const useHis = useHistory();
  const linkTO = () => {
    useHis.push({ pathname: "./" });
  };

  const pluss = () => {
    props.plus();
  };
  const minuss = () => {
    props.minus();
  };
  const oddPlusss = () => {
    if (props.coutV % 2 !== 0) props.plus();
  };

  const asyInc = () => {
    setTimeout(() => {
      props.plus();
    }, 1000);
  };
  let inte;
  useEffect(() => {
    if (props.isOn) {
      inte = setInterval(() => {
        props.plus();
      }, 1000);
    } else {
      clearInterval(inte);
    }

    return () => {
      clearInterval(inte);
    };
  }, [props.isOn]);

  const IntervelInc = (e) => {
    props.switchS();
  };

  //// start todolist
  let input;
  const addTodoFunc = (e) => {
    e.preventDefault();
    if (!input.value.trim()) {
      return;
    }
    props.addTodo(input.value);
    input.value = "";
  };

  const TodoList = () => (
    <ul>
      {props.todos.map((todo) => (
        <li
          key={todo.id}
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          onClick={() => props.toggleTodo(todo.id)}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  );
  const [asc, setAsc] = useState(-1);

  useEffect(() => {
    if (asc) {
      props.todos.sort((a, b) => {
        if (a.text < b.text) {
          return -1;
        }
        if (a.text > b.text) {
          return 1;
        }
        return 0;
      });
      setAsc();
    } else {
      props.todos.sort((a, b) => {
        if (a.text < b.text) {
          return 1;
        }
        if (a.text > b.text) {
          return -1;
        }
        return 0;
      });
      setAsc();
    }
  }, [asc]);

  const [couterVisible, setCouterVisible] = useState(true);
  const [todoVisible, setTodoVisible] = useState(true);

  return (
    <div>
      <button
        style={{ display: "block", margin: "20px 10px auto", height: 50 }}
        onClick={linkTO}
      >
        GO BACK
      </button>

      <button
        style={{ margin: "50px auto", height: 50, width: 100 }}
        onClick={() => setCouterVisible(!couterVisible)}
      >
        {couterVisible ? "CouterChecked" : "checkCouter"}
      </button>
      <div style={{ display: couterVisible ? "block" : "none" }}>
        <div style={{ margin: "0px auto", height: 50, width: 100 }}>
          {" "}
          YOU CLICKED :{props.coutV}
        </div>
        <button
          style={{
            display: "inline",
            marginTop: "50px",
            height: 50,
            width: 100,
          }}
          onClick={pluss}
        >
          +
        </button>
        <button
          style={{ display: "inline", height: 50, width: 100 }}
          onClick={minuss}
        >
          -
        </button>
        <button
          style={{ display: "inline", height: 50, width: 100 }}
          onClick={oddPlusss}
        >
          oddInc
        </button>
        <button
          style={{ display: "inline", height: 50, width: 100 }}
          onClick={asyInc}
        >
          oddInc
        </button>
        <button
          style={{ display: "block", height: 50, width: 100 }}
          onClick={IntervelInc}
        >
          {!props.isOn ? "IntervelInc" : "Stop"}
        </button>
      </div>

      <button
        style={{ margin: "50px auto", height: 50, width: 100 }}
        onClick={() => setTodoVisible(!todoVisible)}

      >
        {todoVisible ? "TODOChecked" : "checkTODO"}
      </button>
      <div style={{ display: todoVisible ? "block" : "none" }}>
        <div style={{ marginTop: 50 }}>
          {/* //callback  */}
          <input ref={(node) => (input = node)} />
          <button onClick={addTodoFunc}>Add Todo</button>
        </div>
        <TodoList />
        <button onClick={() => setAsc(1)}>A-Z</button>
        <button onClick={() => setAsc(0)}>Z-A</button>
      </div>
    </div>
  );
}
// Object of action creators

const plus = () => ({
  type: "INCREMENT",
});
const minus = () => ({
  type: "DECREMENT",
});
const switchS = () => ({
  type: "SWITCH",
});

let nextTodoId = 0;
const addTodo = (text) => ({
  type: "ADD_TODO",
  id: nextTodoId++,
  text,
});

const toggleTodo = (id) => ({
  type: "TOGGLE_TODO",
  id,
});

//****useFunc
const mapDispatchToProps = {
  plus,
  minus,
  switchS,
  addTodo,
  toggleTodo,
};

//invoke when update ****useValue
const mapStateToProps = function (state) {
  return {
    isOn: state.switchValue,
    coutV: state.couterValue,
    todos: state.todos,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxP);
