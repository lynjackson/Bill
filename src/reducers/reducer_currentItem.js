
export default function(state = {}, action) {
	switch (action.type) {
		case 'SETITEM':
			return action.payload
			break;
		default:
			return state;
			break;
	}
};
