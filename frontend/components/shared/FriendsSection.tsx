import React, { useEffect, useState } from 'react';
import FriendsList from './FriendsList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addUserFriend, getUserFriends } from '@/api/user.actions';

const FriendsSection = () => {
	const dispatch = useDispatch();
	const [username, setUsername] = useState('');
	const friends = useSelector((state: RootState) => state.user.friends);
	const currentUser = useSelector((state: RootState) => state.user.currentUser);

	const handleAddFriend = (e: React.FormEvent) => {
		e.preventDefault();
		addUserFriend(currentUser.username, username, dispatch);
		setUsername('');
	};

	useEffect(() => {
		if (currentUser) getUserFriends(currentUser._id, dispatch);
	}, [currentUser]);

	return (
		<div className="flex justify-center align-center flex-col text-center gap-y-2 mt-12">
			<div>
				<form onSubmit={handleAddFriend}>
					<label className="input input-bordered flex items-center gap-2 mx-8">
						<input
							type="text"
							className="grow"
							placeholder="Friends username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</label>
					<button type="submit" className="btn">
						Add Friend
					</button>
				</form>
			</div>
			<p className="text-xl font-semibold fit-content">Your friends</p>
			<FriendsList friends={friends} currentUser={currentUser} />
		</div>
	);
};

export default FriendsSection;
