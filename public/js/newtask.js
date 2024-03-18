const newtaskFormHandler = async (event) => {
    event.preventDefault();

    // Getting values from user input
    const title = document.querySelector('input[name="task-title"]').value;
    const description = document.querySelector('input[name="task-description"]').value; 
    const status = document.querySelector('option[name="task-status"]').value;

    // Makes a POST request to /newTask with task title, desc, status
    const response = await fetch('/api/task-routes', {
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
            status
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    // If POST request is successful, take user back to homepage with task list
    if (response.ok) {
        document.location.replace('/homepage');
    } else {
        alert('Something wrong!');
    }
};

// Event handler
document.querySelector('#newtask-form').addEventListener('submit', newtaskFormHandler);