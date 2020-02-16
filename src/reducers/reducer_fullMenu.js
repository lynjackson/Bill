

export default function(state = {}, action) {
	switch (action.type) {
		case 'FULLMENU':
			return action.payload
			break;
		default:
			return state;
			break;
	}
};
