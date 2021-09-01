import React from "react";
import { useRef, useState, Fragment } from "react";
export default function () {
  const api = "https://pokeapi.co/api/v2/pokemon/?limit=70";
  const optionInitial = [
    "♥♥",
    "CA",
    "AZ",
    "WA",
    "NY",
    "OR",
    "TX",
    "TS",
    "ML",
    "MX",
  ];

  let data = [];
  fetch(api)
    .then((response) => response.json())
    .then((json) => {
      json.results.forEach((ele) => {
        data.push(ele);
      });
    });
  // console.log(data)

  const serchBar = useRef(null);
  const serchBar2 = useRef(null);
  const [dataMatched, setdataMatched] = useState([]);
  const [option, setoption] = useState([]);
  const updateValue = (e) => {
    //  console.log(serchBar.current.value)
    // console.log(e.nativeEvent.keyCode)
    if (serchBar.current.value === "") setdataMatched([]);
    else {
      let matchList = data.filter((val) =>
        val.name.match(serchBar.current.value)
      );
      setdataMatched(matchList);
    }
  };
  const updateOption = (e) => {
    //  console.log(serchBar2.current.value.toUpperCase)
    // console.log(e.nativeEvent.keyCode)
    if (serchBar2.current.value === "") setoption([]);
    else {
      let matchList = optionInitial.filter((val) =>
        val.match(serchBar2.current.value.toUpperCase())
      );
      setoption(matchList);
    }
  };
  return (
    <Fragment>
      <div className="description">
        Type Ahead Search with API <i>(e.g. Type "pik" for "pikachu")</i>
      </div>
      <input
        className="autocom_container"
        ref={serchBar}
        onKeyUp={updateValue}
      ></input>
      {dataMatched.map((item, index) => {
        return (
          <div key={index} className="autocom_list">
            <div>{item.name}</div>
          </div>
        );
      })}

      <div className="description">
        Keyword Search with no API <i>(e.g. Type "A" for "CA, AZ, WA")</i>
      </div>
      <input
        className="autocom_container"
        ref={serchBar2}
        onKeyUp={updateOption}
      ></input>
      {option.map((item, index) => {
        return (
          <div key={index} className="autocom_list">
            <div>{item}</div>
          </div>
        );
      })}
    </Fragment>
  );
}
