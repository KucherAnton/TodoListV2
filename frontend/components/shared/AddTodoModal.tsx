import React from 'react';

interface ModalProps {
	modalOpened: boolean;
	setModalOpened: (open: boolean) => boolean | void;
	children: React.ReactNode;
}

const AddTodoModal: React.FC<ModalProps> = ({
	modalOpened,
	setModalOpened,
	children,
}) => {
	return (
		<div className={`modal ${modalOpened ? 'modal-open' : ''}`}>
			<div className="modal-box relative">
				<label
					onClick={() => setModalOpened(false)}
					className="btn btn-sm btn-circle absolute right-2 top-2">
					x
				</label>
				{children}
			</div>
		</div>
	);
};

export default AddTodoModal;
