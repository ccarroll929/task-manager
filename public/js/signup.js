const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    const response = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({
            username, 
            password,
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        const data = await response.json();

        // If the response includes a "redirect" property, redirect to that URL.
        if (data.redirect) window.location = data.redirect;
    } else {
        alert('Something wrong!');
    }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);