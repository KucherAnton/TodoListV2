import { Todo } from '../types/todo';

interface TodoState {
	todos: Todo[];
}

const initialState: TodoState = {
	todos: [],
};

const todoReducer = (state: TodoState = initialState, action: any) => {
	switch (action.type) {
		case 'ADD_TODO':
			return {
				...state,
				todos: [...state.todos, action.payload],
			};
		case 'UPDATE_TODO':
			return {
				...state,
				todos: state.todos.map((todo) =>
					todo.id === action.payload.id ? action.payload : todo
				),
			};
		case 'DELETE_TODO':
			return {
				...state,
				todos: state.todos.filter((todo) => todo._id !== action.payload),
			};
		default:
			return state;
	}
};

export default todoReducer;
