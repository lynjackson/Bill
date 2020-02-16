//Price state

export default function(state = 0, action) {
	switch (action.type) {
		case 'ADDPRICE':
			return state += action.payload
			break;
		default:
			return state;
			break;
	}
};
