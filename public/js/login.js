// Function to login user
const loginFormHandler = async (event) => {
    event.preventDefault();

    // Getting username and password id's
    const usernameEl = document.querySelector("#username-login");
    const passwordEl = document.querySelector("#password-login");

    // POST request with user login
    const response = await fetch ('/api/login', {
        method: 'POST',
        body: JSON.stringify({
            username: usernameEl.value,
            password: passwordEl.value,
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    // If login credentials were valid, 
    if (response.ok) {
        const data = await response.json();

        // If user data exists, direct them to the homepage
        if (data) {
            document.location.replace('/api/homepage');
        }
        alert('Something went wrong!')
    }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);