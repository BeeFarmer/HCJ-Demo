"use strict";

const IMAGE_LIST = [
  "./img/1.jpg",
  "./img/2.jpg",
  "./img/3.jpg"
];

const newModel = Model();
const imgContainer = document.querySelector(".img");
View(newModel, imgContainer);


function Model() {
  let _subscriber;
  let _imgList = IMAGE_LIST;
  let _index = 0;

  function _action(type) {
    switch (type) {
      case "previous":
        --_index;
        if (_index === -1) { _index = _imgList.length - 1; }
        break;
      case "next":
        ++_index;
        if (_index === _imgList.length) { _index = 0; }
        break;
      default:
    }

    _subscriber(_imgList[_index]);
  }

  return {
    subscribe: function(cb) {
      if (!_subscriber) {
        _subscriber = cb;
      }
    },
    action: _action
  };

}

function View(model, container) {

  const clickElem = document.querySelector(".carousel");
  clickElem.addEventListener('click', function(e){
    model.action(e.target.classList[0]);
  })

  function render(data = IMAGE_LIST[0]) {
    if (data) {
      container.src = data;
    }
  }

  model.subscribe(render);

  render();
}