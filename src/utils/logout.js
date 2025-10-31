export function logout(setIsAuthenticated) {
    fetch('/api/logout', {method: 'DELETE'})
        .then(() => {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
            setIsAuthenticated(false);
        })
        .catch((error) => {
            console.error("Error during logout:", error);
        });
}