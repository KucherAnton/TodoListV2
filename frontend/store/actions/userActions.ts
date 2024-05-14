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

export const setCurrentUser = (user: string) => ({
	type: 'SET_CURRENT_USER',
	payload: user,
});
