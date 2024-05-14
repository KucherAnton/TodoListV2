import React from 'react';
import CurrentUser from './shared/CurrentUser';
import FriendsSection from './shared/FriendsSection';
import Logout from './shared/Logout';

const LeftBar = () => {
	return (
		<section className="w-1/4 flex flex-col h-screen justify-between">
			<CurrentUser />
			<FriendsSection />
			<Logout />
		</section>
	);
};

export default LeftBar;
