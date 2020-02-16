import React from 'react';
import PriceBreakdown from '../flexComponents/priceBreakdown'
import {BottomButton, PayButton, CheckoutButton} from '../flexComponents/bottomButton'
import Tipper from '../components/tipper';
import PayOptionsScreen from '../components/payOptions';
import {SplitBreakdown} from '../components/payPages/splitComponents'


export default function(state = {
  orderState: {
    tip: null,
    payUp: null,
    breakdown: (subTotal, tax)=>{return <PriceBreakdown lineOneValue={subTotal}lineTwoValue={tax.toFixed(2)}/>},
    button: <CheckoutButton buttonPrice={'$0.00'}/>
  }
}, action) {

  switch (action.type) {
		case 'SPLITSTATE':
			return {orderState:{
        tip: action.payload.tip,
        breakdown: action.payload.breakdown,
        payUp: action.payload.payUp,
        button: action.payload.button,
      }};
			break;
      case 'PAYOPTIONSTATE':
  			return {orderState:{
          tip: action.payload.tip,
          breakdown: action.payload.breakdown,
          payUp: action.payload.payUp,
          button: action.payload.button,
        }};
  			break;
		default:
			return state;
			break;
	}
};
