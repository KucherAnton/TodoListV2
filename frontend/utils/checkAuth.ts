import jwt from 'jsonwebtoken';

export const checkAuthentication = () => {
	const token = localStorage.getItem('token');

	if (token) {
		try {
			const decodedToken: any = jwt.decode(token);
			const currentTime = Date.now() / 1000;

			const expirationTime = decodedToken.exp;

			if (expirationTime < currentTime) {
				return false;
			}

			return true;
		} catch (error) {
			return false;
		}
	} else {
		return false;
	}
};
