import { connect } from 'react-redux'
import { fetchAPIData, addItem, submitOrder, emptyCart, setTip, setCategory, setMenu, setCurrentItem, removeItem, yPos, updateName, toFirebase, clearFirebase, updateTable, addCustomPrice, subtractCustomPrice, removeCat, fullMenu, addCat, updatePrice} from '../actions/index.js';
import { bindActionCreators } from 'redux';

export const base = Object.values(props.screenProps.o_firebase).map((person)=>{
  if (person.hasOwnProperty('order')){
    if (person.order.length > 1){
      return person.order.reduce((acc, item)=>{
         return item.price + acc;
    }, 0)
  }
     else if (person.order.length === 1){return person.order[0].price}
  }
  else{
    return 'no order'
  }
})

export const base3 = base.filter((price)=>{
  return (typeof price === 'number')
})
