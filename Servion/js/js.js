
const CAPACITY = 5;
const INIT_STACK = new Array(CAPACITY).fill(null);

const newModel = Model();
const newContainer = document.querySelector(".container");
View(newModel, newContainer);

function Model() {
  let _subscriber;
  let _stack = [];
  let _input;
  let _index = 0;

  function _getInput(input) {
    _input = input;
  }

  function _push() {
    _stack.unshift(_input);
    _subscriber(_stack);
  }

  return {
    subscribe: function(cb) {
      if (!_subscriber) {
        _subscriber = cb;
      }
    },
    getInput: _getInput,
    push: _push
  };
}


function View(model, container) {

  const inputElem = document.querySelector(".input");
  inputElem.addEventListener("input", function(e){
    let cur_input = e.target.value;
    model.getInput(cur_input);
  })

  const btnElem = document.querySelector(".btn");
  btnElem.addEventListener("click", function(e){
    model.push();
  })

  function render(data = INIT_STACK) {
    const cell = document.querySelector(".stack");
    for (let i = CAPACITY; i > 0; --i) {
      cell.children[i-1].innerHTML = data[i-1] ? data[i-1] : "";
    }
  }

  model.subscribe(render);

  render();
}