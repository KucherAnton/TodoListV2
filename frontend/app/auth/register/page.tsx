'use client';

import { registerUser } from '@/api/user.actions';
import { checkAuthentication } from '@/utils/checkAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
	const username = useSelector((state: any) => state.user.username);
	const password = useSelector((state: any) => state.user.password);
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		const isAuth = checkAuthentication();
		if (isAuth) router.push('/');
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { token } = await registerUser(username, password);
		localStorage.setItem('token', token);
		router.push('/');
	};

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: 'SET_USERNAME', payload: e.target.value });
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: 'SET_PASSWORD', payload: e.target.value });
	};

	return (
		<div className="flex min-h-full flex-col justify-center px-6 py-20 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign up a new account
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
								onChange={handleUsernameChange}
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
								onChange={handlePasswordChange}
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
							Sign up
						</button>
					</div>
				</form>

				<p className="mt-10 text-center text-sm text-gray-500">
					Already a member?{' '}
					<Link href="/auth/login">
						<span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
							Login
						</span>
					</Link>
				</p>
			</div>
		</div>
	);
}
