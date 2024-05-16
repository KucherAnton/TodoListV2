import { User } from '../types/user';

interface UserState {
	username: string;
	password: string;
	currentUser: User | null;
	friends: User[];
	currentFriend: string;
}

const initialState: UserState = {
	username: '',
	password: '',
	currentUser: null,
	friends: [],
	currentFriend: '',
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
				friends: [...state.friends, action.payload],
			};
		case 'DELETE_FRIEND':
			return {
				...state,
				friends: state.friends.filter(
					(friend) => friend._id !== action.payload
				),
			};
		case 'SET_CURRENT_FRIEND':
			return {
				...state,
				currentFriend: action.payload,
			};
		default:
			return state;
	}
};

export default userReducer;
