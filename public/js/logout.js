// Function to logout user
const logoutHandler = async () => {
    const response = await fetch ('/api/user-routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    // If successful, return user to mainpage
    if (response.ok) {
        document.location.replace('/');
        alert ('You have logged out!')
    } else {
        alert ('Failed to log out!')
    }
};
// Event handler for logout
document.getElementById('logout').addEventListener('click', logoutHandler);