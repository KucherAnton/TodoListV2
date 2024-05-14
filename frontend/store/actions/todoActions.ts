import { Todo } from '../types/todo';

export const addTodo = (todo: Todo) => ({
	type: 'ADD_TODO',
	payload: todo,
});

export const updateTodo = (todo: Todo) => ({
	type: 'UPDATE_TODO',
	payload: todo,
});

export const deleteTodo = (todoId: string) => ({
	type: 'DELETE_TODO',
	payload: todoId,
});
