import React from 'react';
import AddTask from './AddTask';
import TodoList from './TodoList';

const RightBar = () => {
	return (
		<section className="w-3/4 mx-auto mt-4">
			<div className="text-center my-5 flex flex-col gap-4">
				<h1 className="text-2xl font-bold">Todo List</h1>
				<AddTask />
				<TodoList />
			</div>
		</section>
	);
};

export default RightBar;
