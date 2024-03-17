const loginFormHandler = async (event) => {
    event.preventDefault();

    const usernameEl = document.querySelector("#username-login");
    const passwordEl = document.querySelector("#password-login");

    const response = await fetch ('/api/login', {
        method: 'POST',
        body: JSON.stringify({
            username: usernameEl.value,
            password: passwordEl.value,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        const data = await response.json();

        // If the response includes a "redirect" property, redirect to that URL.
        if (data.redirect) window.location = data.redirect;
    } else {
        alert('Something went wrong!')
    }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);