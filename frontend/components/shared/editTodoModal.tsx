import { updateCurrentTodo } from '@/api/todo.actions';
import { updateTodo } from '@/store/actions/todoActions';
import { Todo } from '@/store/types/todo';
import React, { useEffect, useState } from 'react';

interface EditModalProps {
	isOpen: boolean;
	onClose: () => void;
	todo: Todo | null;
	dispatch: any;
}

const EditTodoModal: React.FC<EditModalProps> = ({
	isOpen,
	onClose,
	todo,
	dispatch,
}) => {
	const [title, setTitle] = useState(todo ? todo.title : '');
	const [description, setDescription] = useState(todo ? todo.description : '');

	useEffect(() => {
		if (todo) {
			setTitle(todo.title);
			setDescription(todo.description);
		}
	}, [todo]);

	const handleUpdate = async (e: React.FormEvent) => {
		e.preventDefault();

		if (todo) {
			const updatedTodo = await updateCurrentTodo(todo._id, {
				title,
				description,
			});
			dispatch(updateTodo(updatedTodo));
			onClose();
		} else {
			return null;
		}
	};

	if (!isOpen) return null;

	return (
		<div className="modal modal-open">
			<div className="modal-box relative">
				<label
					onClick={onClose}
					className="btn btn-sm btn-circle absolute right-2 top-2">
					x
				</label>
				<form onSubmit={handleUpdate}>
					<h3 className="font-bold text-lg">Edit your todo</h3>
					<div className="modal-action">
						<input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							type="text"
							placeholder="Title"
							className="input input-bordered w-full "
						/>
						<input
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							type="text"
							placeholder="Description"
							className="input input-bordered w-full "
						/>
						<button type="submit" className="btn">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditTodoModal;
