//Cart state

export default function(state = [], action) {
	switch (action.type) {
		case 'ADD':
			return [action.payload, ...state]
			break;
			case 'EMPTY':
				return []
				break;
				case 'REMOVE':
					return state.filter((item)=>{
						return item.name !== action.payload
					})
					break;
		default:
			return state;
			break;
	}
};
