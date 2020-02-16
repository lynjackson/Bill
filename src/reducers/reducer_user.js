//User state

export default function(state = {customTotal: 0}, action) {
	switch (action.type) {
		case 'UPDATENAME':
			return Object.assign({name: action.payload}, state)
			break;
      case 'ADDCUSTOM':
			// return {customTotal:action.payload}
				return Object.assign({}, state, {customTotal: action.payload + state.customTotal})
        // return 'cool'
  			break;
				case 'SUBTRACTCUSTOM':
				// return {customTotal:action.payload}
					return Object.assign({}, state, {customTotal: state.customTotal - action.payload })
	        // return 'cool'
	  			break;
		default:
			return state;
			break;
	}
};
