import React from 'react';
import TodoList from './shared/TodoList';
import AddTodoBtn from './shared/AddTodoBtn';

const RightBar = () => {
	return (
		<section className="w-3/4 mx-auto mt-4 mr-2">
			<div className="text-center my-5 flex flex-col gap-4">
				<h1 className="text-2xl font-bold">Todo List</h1>
				<AddTodoBtn />
				<TodoList />
			</div>
		</section>
	);
};

export default RightBar;
