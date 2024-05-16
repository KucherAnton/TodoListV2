import { deleteUserFriend } from '@/api/user.actions';
import { setCurrentFriend } from '@/store/actions/userActions';
import { User } from '@/store/types/user';
import Link from 'next/link';
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

	const handleSelectFriend = (friendId: string) => {
		dispatch(setCurrentFriend(friendId));
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
						<Link href={`/user/${friend._id}`}>
							<a
								className="text-blue-500 hover:underline"
								onClick={() => handleSelectFriend(friend._id)}>
								{friend.username}
							</a>
						</Link>
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
