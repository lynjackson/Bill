export default function(state = 0, action) {
	switch (action.type) {
		case 'TIPUP':
			return state += 1;
			break;
      case 'TIPDOWN':
      return state -= 1;
			break;
			case 'SETTIP':
      return action.payload;
			break;
		default:
			return state;
			break;
	}
};
