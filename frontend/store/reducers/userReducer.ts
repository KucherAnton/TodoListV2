const initialState = {
	username: '',
	password: '',
	currentUser: null,
};

const userReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case 'SET_USERNAME':
			return {
				...state,
				username: action.payload,
			};
		case 'SET_PASSWORD':
			return {
				...state,
				password: action.payload,
			};
		case 'CLEAR_CREDENTIALS':
			return {
				...state,
				username: '',
				password: '',
			};
		case 'SET_CURRENT_USER':
			return {
				...state,
				currentUser: action.payload,
			};
		default:
			return state;
	}
};

export default userReducer;
