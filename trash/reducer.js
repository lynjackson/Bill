import { StackNav } from './navigator';
import { NavigationActions } from 'react-navigation';



const counter = (state = '', action) => {
  switch (action.type) {
  case 'INCREMENT':
    return 'yo'
  case 'DECREMENT':
    return [...state, 'right'];
  case 'RESET':
    return 0;
  default:
    return state;
  }
}

export default counter;
