import { getCurrentUser } from '@/api/user.actions';
import { RootState } from '@/store/store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CurrentUser = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state: RootState) => state.user.currentUser);

	useEffect(() => {
		getCurrentUser(dispatch);
	}, []);

	return (
		<div className="text-center my-5 flex flex-col gap-4">
			<h1 className="text-2xl font-bold">Current user</h1>
			<p className="text-xl font-semibold">
				{currentUser ? currentUser.username : 'Loading...'}
			</p>
		</div>
	);
};

export default CurrentUser;
