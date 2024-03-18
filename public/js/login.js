// Function to login user
const loginFormHandler = async (event) => {
    event.preventDefault();

    // Getting username and password id's
    const username = document.querySelector("#username-login");
    const password = document.querySelector("#password-login");
    const errorMessage = document.querySelector('#error-message');

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