const logoutHandler = async () => {
    const response = await fetch ('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/');
        alert ('You have logged out!')
    } else {
        alert ('Failed to log out!')
    }
};

document.getElementById('logout').addEventListener('click', logoutHandler);