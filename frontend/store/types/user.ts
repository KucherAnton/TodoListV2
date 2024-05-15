export const ADD_FRIEND = 'ADD_FRIEND';
export const DELETE_FRIEND = 'DELETE_FRIEND';

export interface User {
	id: string;
	username: string;
}

export interface AddFriendAction {
	type: typeof ADD_FRIEND;
	payload: User;
}

export interface DeleteFriendAction {
	type: typeof DELETE_FRIEND;
	payload: string;
}

export type UserActionTypes = AddFriendAction | DeleteFriendAction;
