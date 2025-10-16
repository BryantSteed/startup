export function logout(props) {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    props.setIsAuthenticated(false);
}