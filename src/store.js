import { combineReducers, createStore } from "redux"

  
  const couterValue = function(state=0 , action) {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1
      case 'DECREMENT':
        return state - 1
 
      default:
        return state
    }
  }
  const switchValue = function(state = false,action){
      switch(action.type){
          case 'SWITCH':
              return !state
      
      default:
          return state
  }
}
  const reducer =  combineReducers({couterValue,switchValue})

  const store = createStore(reducer)

  export default store;