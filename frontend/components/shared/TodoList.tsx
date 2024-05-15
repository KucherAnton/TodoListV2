import { getUserTodos } from '@/api/user.actions';
import { RootState } from '@/store/store';
import { Todo } from '@/store/types/todo';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditTodoModal from './editTodoModal';
import { deleteTodo } from '@/store/actions/todoActions';
import { deleteCurrentTodo } from '@/api/todo.actions';

const TodoList = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state: RootState) => state.user.currentUser);
	const todos = useSelector((state: RootState) => state.todo.todos);
	const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);
	const [modalOpened, setModalOpened] = useState(false);

	useEffect(() => {
		if (currentUser) getUserTodos(currentUser._id, dispatch);
	}, [currentUser, dispatch]);

	const handleDelete = async (id: string) => {
		await deleteCurrentTodo(id);
		dispatch(deleteTodo(id));
	};

	const handleEdit = (todo: Todo) => {
		setTodoToEdit(todo);
		setModalOpened(true);
	};

	return (
		<div className="overflow-x-auto">
			{todos.length === 0 ? (
				<p className="text-2xl font-bold mt-5">
					All done! Add new tasks to do today
				</p>
			) : (
				<table className="table w-3/4 mx-auto">
					{/* head */}
					<thead>
						<tr>
							<th></th>
							<th className="w-1/4">Title</th>
							<th className="w-3/4">Description</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{todos.map((todo: Todo, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{todo.title}</td>
								<td>{todo.description}</td>
								<td>
									{currentUser._id === todo.author && (
										<>
											<button onClick={() => handleEdit(todo)}>Edit</button>
											<button onClick={() => handleDelete(todo._id)}>
												Delete
											</button>
										</>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			{modalOpened && (
				<EditTodoModal
					isOpen={modalOpened}
					onClose={() => setModalOpened(false)}
					todo={todoToEdit}
					dispatch={dispatch}
				/>
			)}
		</div>
	);
};

export default TodoList;
