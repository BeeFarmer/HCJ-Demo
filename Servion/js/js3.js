"use strict";

const INIT_CONTACT_LIST = {
  9999: {
    name: "Admin",
    email: "admin@hotmail.com"
  }
};

const newModel = Model();
const displayTable = document.querySelector(".table");
View(newModel, displayTable);


function Model() {
  let _subscriber;
  let _contactList = INIT_CONTACT_LIST;
  let _nameElem = document.querySelector("#name");
  let _mobileElem = document.querySelector("#mobile");
  let _emailElem = document.querySelector("#email");

  function _add() {
      // no handle on same number case, Mobile has to be unique
      _contactList[_mobileElem.value] = {
        name: _nameElem.value,
        email: _emailElem.value
      };
      _mobileElem.value = "";
      _nameElem.value = "";
      _emailElem.value = "";

      _subscriber(_contactList);
  }

  function _searchByNumber(num) {
    const res = {};
    for (let key in _contactList) {
      if (key.includes(num)) {
        res[key] = _contactList[key];
      }
    }

    return res;
  }

  function _search(input) {
    if (input) {
      // rendering with search
      const result_list = _searchByNumber(input);
      _subscriber(result_list);
    } else {
      // rendering without search
      _subscriber(_contactList)
    }
  }

  return {
    subscribe: function(cb){
      if (!_subscriber) {
        _subscriber = cb;
      }
    },
    add: _add,
    search: _search
  };
}

function View(model, container) {

  const btnElem = document.querySelector(".btn");
  btnElem.addEventListener("click", () => {
    model.add();
  });

  const searchElem = document.querySelector("#search");
  searchElem.addEventListener("keyup", (e) => {
    let cur_input = e.target.value;
    model.search(cur_input);
  });

  function render(data = INIT_CONTACT_LIST) {
    const tBody = container.tBodies[0];
    tBody.innerHTML = "";
    for (let key in data) {
      tBody.innerHTML += 
      `<tr>
         <td>${data[key]['name']}</td>
         <td>${key}</td>
         <td>${data[key]['email']}</td>
       </tr>`;
    }
  }

  model.subscribe(render);

  render();
}