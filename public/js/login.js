// Function to login user
const loginFormHandler = async (event) => {
    event.preventDefault();

    // Getting username and password id's
    const username = document.querySelector("#username-login");
    const password = document.querySelector("#password-login");
    const errorMessage = document.querySelector('#error-message');

       // If username and/or password fields are empty, display an error message for the user
    if (username === '' || password === '') {
        errorMessage.textContent = '*Please enter both username and password.';
        return;
    }

    if (username && password) {
    // POST request with user login
    const response = await fetch ('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    // If login credentials were valid, 
    if (response.ok) {
        const data = await response.json();

        // If user data exists, direct them to the homepage
        if (data) {
            document.location.replace('/homepage');
        }
        alert('Something went wrong!')
    }
}};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);