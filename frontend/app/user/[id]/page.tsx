'use client';

import { getTodos } from '@/api/todo.actions';
import { getUser } from '@/api/user.actions';
import { setCurrentFriend } from '@/store/actions/userActions';
import { RootState } from '@/store/store';
import { Todo } from '@/store/types/todo';
import { User } from '@/store/types/user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
	const currentFriend = useSelector(
		(state: RootState) => state.user.currentFriend
	);
	const [user, setUser] = useState<User | null>(null);
	const [userTodos, setUserTodos] = useState<Todo[]>([]);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const fetchedUser = await getUser(currentFriend as string);
				setUser(fetchedUser);

				const userTodos = fetchedUser.todos;
				const todos = [];

				for (const todoId of userTodos) {
					const userTodo = await getTodos(todoId);
					todos.push(userTodo);
				}
				setUserTodos(todos);
			} catch (error) {
				console.error('Failed to fetch user data:', error);
			}
		};

		if (currentFriend) {
			fetchUserData();
		}
	}, [currentFriend, dispatch]);

	return (
		<div className="overflow-x-auto">
			<p>{user?.username}: Todos</p>
			{userTodos.length === 0 ? (
				<p className="text-2xl font-bold mt-5">
					{currentFriend.username} has no todos
				</p>
			) : (
				<table className="table w-3/4 mx-auto">
					{/* head */}
					<thead>
						<tr>
							<th></th>
							<th className="w-1/4">Title</th>
							<th className="w-3/4">Description</th>
						</tr>
					</thead>
					<tbody>
						{userTodos.map((todo: Todo, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{todo.title}</td>
								<td>{todo.description}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
