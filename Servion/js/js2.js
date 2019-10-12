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
  let _intervalId;

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

  function _update() {
    _action("next");
  }

  function _slide(checked) {
    if (checked) {
      _intervalId = setInterval(_update, 3000);
    } else {
      clearInterval(_intervalId);
      _intervalId = null;
    }
  }

  return {
    subscribe: function(cb) {
      if (!_subscriber) {
        _subscriber = cb;
      }
    },
    action: _action,
    slide: _slide
  };

}

function View(model, container) {

  const clickElem = document.querySelector(".carousel");
  clickElem.addEventListener('click', function(e){
    //console.log(e.target.classList[0]);
    model.action(e.target.classList[0]);
  })

  const checkElem = document.querySelector(".slidebox");
  checkElem.addEventListener('change', function(){
    //console.log(this.checked);
    model.slide(this.checked);
  })

  function render(data = IMAGE_LIST[0]) {
    if (data) {
      container.src = data;
    }
  }

  model.subscribe(render);

  render();
}