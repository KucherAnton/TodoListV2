import { addTodo } from '@/store/actions/todoActions';
import {
	addFriend,
	deleteFriend,
	setCurrentUser,
} from '@/store/actions/userActions';
import jwt from 'jsonwebtoken';
import { Dispatch } from 'redux';
import { getTodos } from './todo.actions';

export const registerUser = async (
	username: string,
	password: string
): Promise<{ token: string }> => {
	try {
		const response = await fetch('http://localhost:3001/user/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		});

		if (!response.ok) throw new Error('Failed to register');

		return response.json();
	} catch (error: any) {
		throw new Error(`Registration error ${error.message}`);
	}
};

export const loginUser = async (username: string, password: string) => {
	try {
		const response = await fetch('http://localhost:3001/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		});

		if (!response.ok) throw new Error('Failed to register');

		return response.json();
	} catch (error: any) {
		throw new Error(`Login error ${error.message}`);
	}
};

export const getCurrentUser = async (dispatch: Dispatch) => {
	const token = localStorage.getItem('token');

	if (token) {
		try {
			const decodedToken: any = jwt.decode(token);
			const userId = decodedToken.id;

			const response = await fetch(`http://localhost:3001/user/${userId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) throw new Error('Failed to fetch user');

			const user = await response.json();
			dispatch(setCurrentUser(user));
		} catch (error: any) {
			throw new Error(`Fetching error ${error.message}`);
		}
	} else {
		return false;
	}
};

export const getUser = async (userId: string) => {
	try {
		const response = await fetch(`http://localhost:3001/user/${userId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) throw new Error('Failed to fetch user');
		const user = await response.json();
		return user;
	} catch (error: any) {
		throw new Error(`Fetching error ${error.message}`);
	}
};

export const getUserTodos = async (userId: string, dispatch: Dispatch) => {
	try {
		const response = await fetch(`http://localhost:3001/user/${userId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) throw new Error('Failed to fetch todos');

		const user = await response.json();

		const todos = user.todos;

		for (const todoId of todos) {
			const userTodo = await getTodos(todoId);
			dispatch(addTodo(userTodo));
		}
	} catch (error: any) {
		throw new Error(`Fetching error ${error.message}`);
	}
};

export const getUserFriends = async (userId: string, dispatch: Dispatch) => {
	try {
		const response = await fetch(`http://localhost:3001/user/${userId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) throw new Error('Failed to fetch friends');
		const user = await response.json();
		const friends = user.friends;
		for (const friendId of friends) {
			const userFriend = await getUser(friendId);
			dispatch(addFriend(userFriend));
		}
	} catch (error: any) {
		throw new Error(`Fetching error ${error.message}`);
	}
};

export const addUserFriend = async (
	userName: string,
	friendName: string,
	dispatch: Function
) => {
	try {
		const response = await fetch(
			`http://localhost:3001/user/${userName}/friends/${friendName}`,
			{
				method: 'POST',
			}
		);
		if (!response.ok) {
			throw new Error('Failed to add user friend');
		}
		const friend = await response.json();
		console.log(friend);
		const userFriend = await getUser(friend._id);
		console.log(userFriend);
		dispatch(addFriend(userFriend));
	} catch (error: any) {
		throw new Error(`Adding user friend error: ${error.message}`);
	}
};

export const deleteUserFriend = async (
	userId: string,
	friendId: string,
	dispatch: Function
) => {
	try {
		const response = await fetch(
			`http://localhost:3001/user/${userId}/friends/${friendId}`,
			{
				method: 'DELETE',
			}
		);
		if (!response.ok) {
			throw new Error('Failed to remove user friend');
		}
		dispatch(deleteFriend(friendId));
	} catch (error: any) {
		throw new Error(`Removing user friend error: ${error.message}`);
	}
};
