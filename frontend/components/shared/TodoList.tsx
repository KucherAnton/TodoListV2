import { getUserTodos } from '@/api/user.actions';
import { deleteTodo, updateTodo } from '@/store/actions/todoActions';
import { RootState } from '@/store/store';
import { Todo } from '@/store/types/todo';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TodoList = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state: RootState) => state.user.currentUser);
	const todos = useSelector((state: RootState) => state.todo.todos);

	useEffect(() => {
		if (currentUser) getUserTodos(currentUser._id, dispatch);
	}, [currentUser, dispatch]);

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
								<td>{index}</td>
								<td>{todo.title}</td>
								<td>{todo.description}</td>
								<td>
									{currentUser === todo.author && (
										<>
											<button onClick={() => dispatch(updateTodo(todo))}>
												Edit
											</button>
											<button onClick={() => dispatch(deleteTodo(todo.id))}>
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
		</div>
	);
};

export default TodoList;
