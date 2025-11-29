import api from './api';

/**
 * Check if the user is authenticated
 * @returns {Promise<Object|null>} User data if authenticated, null otherwise
 */
export async function checkAuth() {
    try {
        const response = await api.get('/api/user/me');
        if (response.status === 200 && response.data.data) {
            return response.data.data;
        }
        return null;
    } catch (error) {
        console.error('Auth check failed:', error);
        return null;
    }
}

/**
 * Get the current authenticated user
 * @returns {Promise<Object|null>} User data
 */
export async function getUser() {
    return checkAuth();
}

/**
 * Logout the user and redirect to home
 */
export async function logout() {
    try {
        await api.post('/api/auth/logout');
        window.location.href = '/';
    } catch (error) {
        console.error('Logout failed:', error);
        // Redirect to home anyway
        window.location.href = '/';
    }
}

/**
 * Check if user has a specific role
 * @param {Object|null} user
 * @param {'USER'|'ORGANIZER'|'BOTH'} role
 * @returns {boolean}
 */
export function hasRole(user, role) {
    if (!user) return false;
    if (role === 'BOTH') return user.role === 'BOTH';
    if (role === 'ORGANIZER') return user.role === 'ORGANIZER' || user.role === 'BOTH';
    if (role === 'USER') return user.role === 'USER' || user.role === 'BOTH';
    return false;
}
