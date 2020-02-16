export default function(state = {}, action) {
	switch (action.type) {
		case 'FIREBASE':
			return action.payload
			break;
			case 'CLEARBASE':
				return {}
				break;
		default:
			return state;
			break;
	}
};
