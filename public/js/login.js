// Function to login user
const loginFormHandler = async (event) => {
    event.preventDefault();

    // Getting username and password id's
    const username = document.querySelector("#username-login");
    const password = document.querySelector("#password-login");
    const errorMessage = document.querySelector('#error-message');
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;

    // If username and/or password fields are empty, display an error message for the user
    if (username === '' || password === '') {
        errorMessage.textContent = '*Please enter both username and password.';
        return;
    }
    // If username contains characters that are not alphanumeric, display an error message for the user
    if (!alphanumericRegex.test(username)) {
        errorMessage.textContent = '*Username can only contain letters and numbers.';
        return; // Stop further execution
    }
    // If password is less than 8 characters, display an error message for the user
    if (password.length < 8) {
        errorMessage.textContent = '*Password must contain at least 8 characters'
        return; 
    }
    // POST request with user login
    const response = await fetch ('/api/login', {
        method: 'POST',
        body: JSON.stringify({
            username: username.value,
            password: password.value,
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
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);