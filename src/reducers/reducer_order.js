//Order state

export default function(state = [], action) {
	switch (action.type) {
		case 'SUBMIT':
			return state.concat(action.payload);
			break;
			case 'ORDERUP':
				return state.concat(action.payload);
				break;
		default:
			return state;
			break;
	}
};
