export default function(state = '', action) {
	switch (action.type) {
		case 'FETCH':
			return action.payload
			break;
		default:
			return state;
			break;
	}
};
