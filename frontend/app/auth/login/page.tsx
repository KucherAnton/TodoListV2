'use client';

import { checkAuthentication } from '@/utils/checkAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	useEffect(() => {
		const isAuth = checkAuthentication();
		if (isAuth) router.push('/');
	}, []);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:3001/user/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			});
			if (response.ok) {
				const { token } = await response.json();
				localStorage.setItem('token', token);
				console.log('Авторизация успешна');
				router.push('/');
			} else {
				console.error('Ошибка аутентификации');
			}
		} catch (error) {
			console.error('Произошла ошибка:', error);
		}
	};

	return (
		<div className="flex min-h-full flex-col justify-center px-6 py-20 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign in to your account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form
					className="space-y-6"
					action="#"
					method="POST"
					onSubmit={handleSubmit}>
					<div>
						<label className="block text-sm font-medium leading-6 text-gray-900">
							Username
						</label>
						<div className="mt-2">
							<input
								required
								className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label className="block text-sm font-medium leading-6 text-gray-900">
								Password
							</label>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								required
								className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
							Sign in
						</button>
					</div>
				</form>

				<p className="mt-10 text-center text-sm text-gray-500">
					Not a member?{' '}
					<Link href="/auth/register">
						<span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
							Register
						</span>
					</Link>
				</p>
			</div>
		</div>
	);
}
