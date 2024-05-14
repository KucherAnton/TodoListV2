import { addTodo } from '@/store/actions/todoActions';
import { setCurrentUser } from '@/store/actions/userActions';
import jwt from 'jsonwebtoken';
import { Dispatch } from 'redux';

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

		todos.forEach((todo: any) => {
			dispatch(addTodo(todo));
		});
	} catch (error: any) {
		throw new Error(`Fetching error ${error.message}`);
	}
};
