//map function / connect page
import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
//import Counter from './counter.js';
import Menu from './menu.js';
import ScrollStuff from './scrollStuff.js';
import ItemPage from './itemPage.js';
import Nav from './nav.js';


// 3. function that creates react props called 'count' and 'color' and sets their values to the state.
const mapStateToProps = state => ({
  yo: state
})

/* 1. creates props called increment, decrement, and reset, and gives them functions that send actions to the store*/
const mapDispatchToProps = dispatch => ({
  increment: () => { dispatch({ type: 'INCREMENT' }) },
  decrement: () => { dispatch({ type: 'DECREMENT' }) },
  reset: () => { dispatch({ type: 'RESET' }) },
  fetch: (payload) => {dispatch({type: 'FETCH', data: payload})},
  setter: (payload) => {dispatch({type: 'SETTER', food: payload})},
  add: (item, cost) => {dispatch({type: 'ADD', item: item, cost: cost})},
})


//export default connect(mapStateToProps, mapDispatchToProps)(Nav);

// connect passes these props to the component you tell it to (Nav)
//


/*it starts here:

1. mappers.js: mapDispatchToProps() creates props called 'increment', 'decrement'...
and places functions inside them that send corresponding action types to the store.

2. nav.js: The props are mapped to the Nav component. Nav passes them to the children components with screenProps. When a prop is invoked,
its dispatch function executes, sending the corresponding Action Type to the store.

3. store.js: The Reducer Function receives the Action Type and sets the state to whatever
that action type dictates in the reducer function.

4. mapper.js: mapStateToProps() then takes that state value and places it in React props.

5. anyComponent.js: wherever the prop {this.props.*prop*} is placed, it will render as the state value.*/
