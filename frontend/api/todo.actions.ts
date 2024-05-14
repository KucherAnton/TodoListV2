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
