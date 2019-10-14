"use strict";

const CAPACITY = 5;
const INIT_STACK = new Array(CAPACITY).fill(null);

const newModel = Model();
const newContainer = document.querySelector(".container");
View(newModel, newContainer);

function Model() {
  let _subscriber;
  let _stack = INIT_STACK;
  let _input;
  let _index = CAPACITY - 1;

  function _getInput(input) {
    _input = input;
  }

  const _invalidMsg = () => alert("Operation not allowed!");

  function _action(type) {
    switch (type) {
      case "push":

        if (_index === -1) { alert("Stack was already full!"); return ; }
        if (_input) {
          _stack[_index--] = _input;
        }
        console.log(_stack);
        break;
      case "pop":
        if (_index !== CAPACITY - 1) {
          _stack[++_index] = null;
        } else {
          _invalidMsg();
        }
        break;
      case "empty":
        const msg = (_index === CAPACITY - 1) ? 
                    "Yes, Stack is empty" :
                    "No, Stack is not empty";
        alert(msg);
        break;
      case "peak":
        if (_stack[_index+1]) { 
          alert(_stack[_index+1]); 
        } else {
          _invalidMsg();
        }
        break;
      case "swap":
        if (_index <= CAPACITY - 3) {
          const temp = _stack[_index+1];
          _stack[_index+1] = _stack[_index+2];
          _stack[_index+2] = temp;
        } else {
          _invalidMsg();
        }
        break;
      default:
        _invalidMsg();
    }
    
    _subscriber(_stack);
  }

  return {
    subscribe: function(cb) {
      if (!_subscriber) {
        _subscriber = cb;
      }
    },
    getInput: _getInput,
    action: _action
  };
}


function View(model, container) {

  const inputElem = document.querySelector(".input");
  inputElem.addEventListener("input", function(e){
    let cur_input = e.target.value;
    model.getInput(cur_input);
  })

  const clickElem = document.querySelector(".stack-action");
  clickElem.addEventListener("click", function(e){
    let actionType = e.target.classList[1];
    model.action(actionType);
  })

  function render(data = INIT_STACK) {
    //const cell = document.querySelector(".stack");
    for (let i = 1; i <= CAPACITY; ++i) {
      //cell.children[i-1].innerHTML = data[i-1] ? data[i-1] : "";
      document.querySelector(`[id='${i}']`).innerHTML = data[CAPACITY-i] ? data[CAPACITY-i] : "";
    }
  }

  model.subscribe(render);

  render();
}