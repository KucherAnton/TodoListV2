import { User } from '../types/user';

export const setUsername = (username: string) => ({
	type: 'SET_USERNAME',
	payload: username,
});

export const setPassword = (password: string) => ({
	type: 'SET_PASSWORD',
	payload: password,
});

export const clearCredentials = () => ({
	type: 'CLEAR_CREDENTIALS',
});

export const setCurrentUser = (user: User | null) => ({
	type: 'SET_CURRENT_USER',
	payload: user,
});

export const addFriend = (friend: User) => ({
	type: 'ADD_FRIEND',
	payload: friend,
});

export const deleteFriend = (friendId: string) => ({
	type: 'DELETE_FRIEND',
	payload: friendId,
});
