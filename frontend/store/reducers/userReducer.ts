import { User } from '../types/user';

interface UserState {
	username: string;
	password: string;
	currentUser: User | null;
	users: User[];
}

const initialState: UserState = {
	username: '',
	password: '',
	currentUser: null,
	users: [],
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
		case 'ADD_FRIEND':
			return {
				...state,
				users: [...state.users, action.payload],
			};
		case 'DELETE_FRIEND':
			return {
				...state,
				users: state.users.filter((user) => user.id !== action.payload),
			};
		default:
			return state;
	}
};

export default userReducer;
