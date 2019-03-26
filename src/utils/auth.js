export default {
    isLoggedIn: () => {
        return sessionStorage.getItem('authtoken');
    }
}