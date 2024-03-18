const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
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

    const response = await fetch('/api/user/signup', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        const data = await response.json();

        if (data) {
            document.location.replace('/homepage');
        }
    } else {
        alert('Something wrong!');
    }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);