'use client';

import { AiOutlinePlus } from 'react-icons/ai';
import AddTodoModal from './AddTodoModal';
import { FormEventHandler, useState } from 'react';
import { createTodo } from '@/api/todo.actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addTodo } from '@/store/actions/todoActions';

const AddTodoBtn = () => {
	const [modalOpened, setModalOpened] = useState<boolean>(false);
	const [newTitleValue, setNewTitleValue] = useState('');
	const [newDescriptionValue, setNewDescriptionValue] = useState('');
	const currentUser = useSelector((state: RootState) => state.user.currentUser);
	const dispatch = useDispatch();

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		const newTodo = await createTodo({
			title: newTitleValue,
			description: newDescriptionValue,
			author: currentUser.username,
		});

		setNewTitleValue('');
		setNewDescriptionValue('');
		dispatch(addTodo(newTodo));
		setModalOpened(false);
	};

	return (
		<div>
			<button
				onClick={() => setModalOpened(true)}
				className="btn btn-primary w-3/4">
				Add new todo <AiOutlinePlus className="ml-2" size={18} />
			</button>
			<AddTodoModal modalOpened={modalOpened} setModalOpened={setModalOpened}>
				<form onSubmit={handleSubmit}>
					<h3 className="font-bold text-lg">Add new todo</h3>
					<div className="modal-action">
						<input
							value={newTitleValue}
							onChange={(e) => setNewTitleValue(e.target.value)}
							type="text"
							placeholder="Title"
							className="input input-bordered w-full "
						/>
						<input
							value={newDescriptionValue}
							onChange={(e) => setNewDescriptionValue(e.target.value)}
							type="text"
							placeholder="Description"
							className="input input-bordered w-full "
						/>
						<button type="submit" className="btn">
							Submit
						</button>
					</div>
				</form>
			</AddTodoModal>
		</div>
	);
};

export default AddTodoBtn;
