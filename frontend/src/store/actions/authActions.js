import { loginSuccess, loginFailure, userLoaded, logout, loginStart } from '../slices/authSlice';

// Load User
export const loadUser = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            return dispatch(logout());
        }

        dispatch(loginStart());

        const response = await fetch('http://localhost:5001/api/auth/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Session expired');
        }

        dispatch(userLoaded(data));
    } catch (err) {
        console.error('Load user error:', err);
        dispatch(logout());
    }
};
