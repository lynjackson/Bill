export default function(state = {
  tablePrice: null,
}, action) {
	switch (action.type) {
		case 'UPDATETABLE':
			return {
        price: action.payload.price
      }
			break;
		default:
			return state;
			break;
	}
};
