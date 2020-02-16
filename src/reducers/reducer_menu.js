

export default function(state = {}, action) {
	switch (action.type) {
		case 'SETMENU':
			return action.payload
			break;
		case 'EDITMENU':
			return action.payload
			break;
		default:
			return state;
			break;
	}
};
