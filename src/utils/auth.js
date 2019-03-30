export default {
    isLoggedIn: () => {
        return sessionStorage.getItem('authtoken');
    },
    isAdmin: (userData) => {
        if (userData.roles) {
            if (userData.roles.includes('Admin')) return true;
        }
        return false;
    }
}