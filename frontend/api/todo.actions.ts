interface TodoDto {
	title: string;
	description: string;
	author: string;
}

export const createTodo = async (todoData: TodoDto) => {
	try {
		const response = await fetch('http://localhost:3001/todo', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(todoData),
		});

		if (!response.ok) throw new Error('Failed to create todo');

		const createdTodo = await response.json();
		return createdTodo;
	} catch (error: any) {
		throw new Error(`Creating todo error ${error.message}`);
	}
};

export const getTodos = async (todoId: string) => {
	try {
		const response = await fetch(`http://localhost:3001/todo/${todoId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) throw new Error('Failed to fetch todo');

		const todo = await response.json();
		return todo;
	} catch (error: any) {
		throw new Error(`Fetching todo error ${error.message}`);
	}
};

export const updateCurrentTodo = async (
	todoId: string,
	todoData: { title: string; description: string }
) => {
	try {
		const response = await fetch(`http://localhost:3001/todo/${todoId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(todoData),
		});

		if (!response.ok) throw new Error('Failed to update todo');

		const todo = await response.json();
		return todo;
	} catch (error: any) {
		throw new Error(`Updation todo error ${error.message}`);
	}
};

export const deleteCurrentTodo = async (todoId: string) => {
	try {
		const response = await fetch(`http://localhost:3001/todo/${todoId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) throw new Error('Failed to delete todo');

		return { id: todoId };
	} catch (error: any) {
		throw new Error(`Deleting todo error ${error.message}`);
	}
};
