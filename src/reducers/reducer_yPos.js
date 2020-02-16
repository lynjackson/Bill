export default function(state = {}, action) {
	switch (action.type) {
		case 'YPOS':
			return {...state, [action.payload.key]: action.payload.value}
			break;
			case 'EMPTY':
				return {}
				break;
		default:
			return state;
			break;
	}
};
