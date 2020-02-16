
export default function(state = {}, action) {
	switch (action.type) {
		case 'CAT':
		return action.payload
		break;
		case 'EMPTY':
		return {}
		break;
		case 'EMPTY':
		return {}
		break;
		case 'EMPTY':
		return {}
		break;

		default:
			return state;
			break;
	}
};
