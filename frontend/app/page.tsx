'use client';

import LeftBar from '@/components/LeftBar';
import RightBar from '@/components/RightBar';
import { checkAuthentication } from '@/utils/checkAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		const isAuth = checkAuthentication();
		if (!isAuth) router.push('/auth/register');
	}, []);

	return (
		<main className="flex w-full">
			<LeftBar />
			<RightBar />
		</main>
	);
}
