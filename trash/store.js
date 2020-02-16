//page for store and reducer function
import { createStore } from 'redux'

const initialState = {
  load: 'naw',
  results: [],
  order:{
    items: [],
    costs: [],
    quantity: [],
  }
}

function pusher(param){

}

export const counter = (state = initialState, action) => {
  switch (action.type) {
  case 'INCREMENT':
    return [...state, 'Jackson'];
  case 'DECREMENT':
    return [...state, 'right'];
  case 'RESET':
    return 0;
  case 'FETCH':
    return Object.assign({}, state, {load: 'yep', results: action.data});
  case 'SETTER':
    return Object.assign({foods: action.food}, state);
  case 'ADD':
    return Object.assign(state, {order: {items: [...state.order.items, action.item], costs: [...state.order.costs, action.cost]}});
  default:
    return state;
  }
}
//reducer function receives actions sent by increment/decrement props and sets state accordingly


const store = createStore(counter);

export default store;
