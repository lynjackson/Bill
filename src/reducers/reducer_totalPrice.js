export default function(state = 0, action) {
	switch (action.type) {
		case 'UPDATEPRICE':
			return state += action.payload
			break;
		default:
			return state;
			break;
	}
};
