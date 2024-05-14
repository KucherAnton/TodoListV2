import { useRouter } from 'next/navigation';
import React from 'react';
import { IoIosLogOut } from 'react-icons/io';

const Logout = () => {
	const router = useRouter();

	const handleLogout = () => {
		localStorage.removeItem('token');
		router.push('/auth/login');
	};

	return (
		<div className="flex justify-center mb-4">
			<button
				onClick={handleLogout}
				className="btn btn-primary w-1/2 text-l font-bold">
				Logout <IoIosLogOut className="ml-2" size={26} />
			</button>
		</div>
	);
};

export default Logout;
