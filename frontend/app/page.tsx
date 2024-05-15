'use client';

import { getCurrentUser } from '@/api/user.actions';
import LeftBar from '@/components/LeftBar';
import RightBar from '@/components/RightBar';
import { checkAuthentication } from '@/utils/checkAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Home() {
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		const isAuth = checkAuthentication();
		if (!isAuth) router.push('/auth/register');
		getCurrentUser(dispatch);
	}, [dispatch]);

	return (
		<main className="flex w-full h-full">
			<LeftBar />
			<RightBar />
		</main>
	);
}
