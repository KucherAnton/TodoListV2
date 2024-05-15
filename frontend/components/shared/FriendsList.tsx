import { deleteUserFriend } from '@/api/user.actions';
import { User } from '@/store/types/user';
import React from 'react';
import { useDispatch } from 'react-redux';

interface FriendListProps {
	currentUser: User;
	friends: User[];
}

const FriendsList: React.FC<FriendListProps> = ({ friends, currentUser }) => {
	const dispatch = useDispatch();

	const handleRemoveFriend = (friendId: string) => {
		deleteUserFriend(currentUser._id, friendId, dispatch);
	};

	return (
		<ul className="divide-y">
			{friends.length === 0 ? (
				<p className="p-4">Add some friends!</p>
			) : (
				friends.map((friend) => (
					<li
						key={friend._id}
						className="flex justify-between items-center p-4">
						{friend.username}
						<button
							onClick={() => handleRemoveFriend(friend._id)}
							className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
							Remove
						</button>
					</li>
				))
			)}
		</ul>
	);
};

export default FriendsList;
