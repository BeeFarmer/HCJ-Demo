import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const couterValue = function (state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;

    default:
      return state;
  }
};
const switchValue = function (state = false, action) {
  switch (action.type) {
    case "SWITCH":
      return !state;

    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
};

const reducer = combineReducers({
  couterValue,
  switchValue,
  todos,

});

const store = createStore(reducer, composeWithDevTools());

export default store;
